# -*- coding: utf-8 -*-

import os
import logging

from google.appengine.ext import db
from google.appengine.ext.webapp.util import run_wsgi_app

from bottle import default_app, route, post, request, error, debug
from jinja2 import Environment, FileSystemLoader, TemplateNotFound

import settings
from imgur import ImgurExtension
from memorize import memorize
from models import Entry

jinja2 = Environment(
        loader=FileSystemLoader([os.path.join(os.path.dirname(__file__), settings.TEMPLATE_DIR)]),
        extensions=[ImgurExtension])

jinja2.globals.update(blog=settings.blog)

def render(*args, **kwargs):
    import inspect
    callframe = inspect.getouterframes(inspect.currentframe(), 2)
    template = jinja2.get_template('{}.template'.format(callframe[1][3]))
    return template.render(*args, **kwargs)

@route('/')
@memorize
def index():
    return render(entries=db.Query(Entry).order('-published').fetch(limit=25))

@route('/entry/:slug')
@memorize
def entry(slug):
    entry = db.Query(Entry).filter('slug =', slug).get()
    if not entry:
        from bottle import HTTPError
        raise HTTPError(404)
    else:
        return render(entry=entry)

@route('/about')
@memorize
def about():
    return render()

@route('/code')
@memorize
def code():
    return render()

@route('/archive')
@memorize
def archive():
    return render(entries=db.Query(Entry).order('-published'))

@route('/categories')
@memorize
def category():
    return render()

@route('/category/:category')
@memorize
def category(category):
    query = db.Query(Entry)
    query.filter('categories', category)
    query.order('-published')
    result = query.fetch(limit=25)
    if not result:
        from bottle import HTTPError
        raise HTTPError(404)

    return render(entries=result)

@route('/feed')
@memorize
def feed():
    query = db.Query(Entry)
    query.order('-published')
    query.fetch(limit=25)
    return render(entries=query)

@error(404)
@memorize
def error404(code):
    return render()

@post('/hook')
def hook():
    try:
        import json
        from bottle import request
        payload = json.loads(request.forms.get('payload'))
    except:
        logging.error('Failed to parse JSON')
    else:
        for commit in payload['commits']:
            for action, files  in commit.iteritems():
                if action in ['added', 'modified']:
                    for filename in files:
                        # XXX Add to task queue
                        basename, extension = os.path.splitext(filename)
                        if extension in ['.entry', '.meta']:
                            from google.appengine.api import urlfetch
                            from utils import build_url
                            result = urlfetch.fetch(url = build_url(filename))
                            if result.status_code == 200:
                                entry = Entry.get_or_insert(basename)
                                if extension.endswith('.entry'):
                                    entry.content = jinja2.from_string(result.content.decode('utf-8')).render()
                                else:
                                    try:
                                        import yaml
                                        meta = yaml.load(result.content)
                                    except:
                                        logging.error('Failed to parse YAML')
                                    else:
                                        entry.title = meta['title']
                                        entry.categories = meta['categories']
                                        entry.published = meta['published']
                                entry.slug = basename
                                entry.put()
                            else:
                                logging.error('failed to fetch %s' % filename)

                elif action in ['removed']:
                    for filename in files:
                        basename, extension = os.path.splitext(filename)
                        entry = Entry.get_by_key_name(basename)
                        if entry: entry.delete()
                else:
                    pass
    finally:
        from google.appengine.api import memcache
        memcache.flush_all()

def main():
    run_wsgi_app(default_app())

if __name__ == '__main__':
    main()


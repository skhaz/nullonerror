# -*- coding: utf-8 -*-
import os
import logging

from google.appengine.ext import db
from google.appengine.ext.webapp.util import run_wsgi_app

from bottle import default_app, route, post, request, error
from jinja2 import Environment, FileSystemLoader, TemplateNotFound

import settings
from imgur import ImgurExtension
from memorize import memorize
from models import Entry

template_loader = FileSystemLoader([os.path.join(os.path.dirname(__file__), settings.TEMPLATE_DIR)])
extensions = [ImgurExtension]

jinja2 = Environment(loader=template_loader, extensions=extensions)
jinja2.globals.update(blog=settings.blog)

def render(*args, **kwargs):
    import inspect
    callframe = inspect.getouterframes(inspect.currentframe(), 2)
    template = jinja2.get_template('{}.html'.format(callframe[1][3]))

    return template.render(*args, **kwargs)

@route('/')
@memorize
def index():
    entries = db.Query(Entry).order('-published').fetch(limit=25)
    return render(entries=entries)

@route('/entry/:slug')
@memorize
def entry(slug):
    entry = db.Query(Entry).filter("slug =", slug).get()
    if not entry:
        from bottle import HTTPError
        raise HTTPError(404)
    else:
        return render(entry=entry)

@post('/hook')
def hook():
    try:
        import json
        payload = json.loads(self.request.get("payload"))
    except:
        logging.error("Failed to parse JSON")
    else:
        for commit in payload["commits"]:
            for action, files  in commit.iteritems():
                if action in ["added", "modified"]:
                    for filename in files:
                        self.add_or_update_entry(filename)
                elif action in ["removed"]:
                    for filename in files:
                        self.delete_entry(filename)
    finally:
        memcache.flush_all()

    def add_or_update_entry(self, filename):
        basename, extension = os.path.splitext(filename)
        if extension in [".entry", ".meta"]:
            result = urlfetch.fetch(url = build_url(filename))
            if result.status_code == 200:
                entry = Entry.get_or_insert(basename)
                if extension.endswith(".entry"):
                    entry.content = jinja2.from_string(result.content.decode('utf-8')).render()
                else:
                    try:
                        import yaml
                        meta = yaml.load(result.content)
                    except:
                        logging.error("Failed to parse YAML")
                    else:
                        entry.title = meta["name"]

                entry.slug = basename
                entry.put()
            else:
                logging.error("failed to fetch %s" % filename)

    def delete_entry(self, filename):
        basename, extension = os.path.splitext(filename)
        entry = Entry.get_by_key_name(basename)
        if entry: entry.delete()

@route('/about')
@memorize
def about():
    return render()

@route('/code')
@memorize
def code():
    return render()

@route('/keepalive')
def keepalive():
    pass

# TODO entry
# TODO feed/rss

@route('/archive')
#@memorize
def archive():
    return render()

@error(404)
@memorize
def error404(code):
    return render()

def main():
    run_wsgi_app(default_app())

if __name__ == "__main__":
    main()


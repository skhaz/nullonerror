# -*- coding: utf-8 -*-
from google.appengine.ext import db, deferred
from bottle import app, run, route, post, request, error

import logging
import settings

from tasks import github_postreceive
from memorize import memorize
from models import Entry

def render(*args, **kwargs):
    from os.path import join, dirname
    from inspect import getframeinfo, currentframe
    from jinja2 import Environment, FileSystemLoader

    jinja2 = Environment(
            loader=FileSystemLoader([join(dirname(__file__), settings.TEMPLATE_DIR)]))
    jinja2.globals.update(blog=settings.blog)
    return jinja2.get_template('%s.template' % getframeinfo(currentframe().f_back)[2]).render(*args, **kwargs)

@route('/')
# @memorize
def index():
    return render(entries=db.Query(Entry).order('-published').run())

@route('/entry/:slug')
# @memorize
def entry(slug):
    entry = db.Query(Entry).filter('slug =', slug).get()
    if not entry:
        from bottle import HTTPError
        raise HTTPError(404)
    else:
        return render(entry=entry)

@route('/about')
# @memorize
def about():
    return render()

@route('/tags')
# @memorize
def tags():
    return render()

@route('/tag/:tag')
# @memorize
def tag(tag):
    query = db.Query(Entry)
    query.filter('tag', tag)
    query.order('-published')
    result = query.run()
    if not result:
        from bottle import HTTPError
        raise HTTPError(404)

    return render(entries=result)

@route('/feed')
# @memorize
def feed():
    query = db.Query(Entry)
    query.order('-published')
    return render(entries=query.run())

@error(404)
# @memorize
def error404(code):
    return render()

@post('/hook')
def hook():
    deferred.defer(github_postreceive, request.forms.get('payload'))


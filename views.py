# -*- coding: utf-8 -*-
from google.appengine.ext import db, deferred
from bottle import Bottle

import logging
import settings

from tasks import github_postreceive
from memorize import memorize
from models import Entry

import sys, os

from bottle import debug


app = Bottle()
debug(True)

def render(*args, **kwargs):
    from os.path import join, dirname
    from inspect import getframeinfo, currentframe
    from jinja2 import Environment, FileSystemLoader

    jinja2 = Environment(
            loader=FileSystemLoader([join(dirname(__file__), settings.TEMPLATE_DIR)]))
    jinja2.globals.update(blog=settings.blog)
    return jinja2.get_template('%s.template' % getframeinfo(currentframe().f_back)[2]).render(*args, **kwargs)

@app.route('/')
# @memorize
def index():
    return render(entries=db.Query(Entry).order('-published').run())

@app.route('/entry/:slug')
# @memorize
def entry(slug):
    entry = db.Query(Entry).filter('slug =', slug).get()
    if not entry:
        from bottle import HTTPError
        raise HTTPError(404)
    else:
        return render(entry=entry)

@app.route('/about')
# @memorize
def about():
    return render()

@app.route('/tags')
# @memorize
def tags():
    return render()

@app.route('/tag/:tag')
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

@app.route('/feed')
# @memorize
def feed():
    query = db.Query(Entry)
    query.order('-published')
    return render(entries=query.run())

@app.error(404)
# @memorize
def error404(code):
    return render()

@app.post('/hook')
def hook():
    from bottle import request
    deferred.defer(
            github_postreceive,
            request.forms.get('payload'))


# -*- coding: utf-8 -*-
import os
import json
import yaml

from google.appengine.api import urlfetch
from google.appengine.ext import db
from google.appengine.ext.webapp.util import run_wsgi_app

from bottle import default_app, route, request, error
from jinja2 import Environment, FileSystemLoader, TemplateNotFound

import settings
from imgur import ImgurExtension
from memorize import memorize
from models import Entry
from utils import build_url

template_loader = FileSystemLoader([os.path.join(os.path.dirname(__file__), settings.TEMPLATE_DIR)])
extensions = [ImgurExtension]

jinja2 = Environment(loader=template_loader, extensions=extensions)
jinja2.globals.update(blog=settings.blog)


@route('/')
@memorize
def index():
    template = jinja2.get_template('index.html')
    return template.render(entries = db.Query(Entry).order('-published').fetch(limit=25))

@route('/test/:param1/:param2')
@memorize
def test(param1, param2):
    return param1

@error(404)
@memorize
def error404(code):
    """ TODO """
    pass

def main():
    run_wsgi_app(default_app())

if __name__ == "__main__":
    main()


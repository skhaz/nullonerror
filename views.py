# -*- coding: utf-8 -*-
from bottle import default_app, route, request, error
from google.appengine.ext.webapp.util import run_wsgi_app
from memorize import memorize

@route('/')
@memorize
def index():
    pass

@route('/test/:param1/:param2')
@memorize
def test(param1, param2):
    return param1

def main():
    run_wsgi_app(default_app())

if __name__ == "__main__":
    main()


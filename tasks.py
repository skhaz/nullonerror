# -*- coding: utf-8 -*-
from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import taskqueue
from google.appengine.api import urlfetch

from os.path import splitext
from jinja2 import Environment

from imgur import ImgurExtension
from models import Entry
from utils import build_url
import yaml
import logging
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '3rdparty/markdown2'))

def insert_or_update_entry(filename):
    basename, extension = splitext(filename)
    if extension in ['.markdown', '.meta']:
        result = urlfetch.fetch(url = build_url(filename))
        if result.status_code == 200:
            entry = Entry.get_or_insert(basename)
            if extension.endswith('.markdown'):
                import markdown2
                html = markdown2.markdown(result.content.decode('utf-8'))
                if html:
                    jinja2 = Environment(extensions=[ImgurExtension])
                    entry.content = jinja2.from_string(html).render()
            else:
                try:
                    meta = yaml.load(result.content)
                except Exception as ex:
                    logging.error('Failed to parse YAML: %s' % ex)
                else:
                    entry.title = meta['title']
                    entry.tags = meta['tags']
                    entry.published = meta['published']
            entry.slug = basename
            entry.put()
        else:
            logging.error('failed to fetch %s' % filename)

def delete_entry(filename):
    basename, extension = splitext(filename)
    entry = Entry.get_by_key_name(basename)
    if entry:
        entry.delete()

def github_postreceive(data):
    import json
    import yaml

    try:
        payload = json.loads(data)
    except:
        logging.error('Failed to parse JSON')
    else:
        commits = payload['commits']
        if commits:
            memcache.flush_all()

        for commit in commits:
            for action, files  in commit.iteritems():
                if action in ['added', 'modified']:
                    for filename in files:
                        insert_or_update_entry(filename)
                elif action in ['removed']:
                    for filename in files:
                        delete_entry(filename)


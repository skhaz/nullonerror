# -*- coding: utf-8 -*-

import os
import json
import yaml

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import taskqueue
from google.appengine.api import urlfetch

from jinja2 import Environment

from imgur import ImgurExtension
from models import Entry
from utils import build_url

jinja2 = Environment(extensions=[ImgurExtension])

def worker(data):
    try:
        payload = json.loads(data)
    except:
        logging.error('Failed to parse JSON')
    else:
        for commit in payload['commits']:
            for action, files  in commit.iteritems():
                if action in ['added', 'modified']:
                    for filename in files:
                        basename, extension = os.path.splitext(filename)
                        if extension in ['.entry', '.meta']:
                            result = urlfetch.fetch(url = build_url(filename))
                            if result.status_code == 200:
                                entry = Entry.get_or_insert(basename)
                                if extension.endswith('.entry'):
                                    entry.content = jinja2.from_string(result.content.decode('utf-8')).render()
                                else:
                                    try:
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

                memcache.flush_all()


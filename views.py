# -*- coding: utf-8 -*-
import os, logging, datetime, StringIO
import json, yaml, webapp2
from google.appengine.api import urlfetch
from google.appengine.ext import db
from google.appengine.api import memcache

from jinja2 import Environment, FileSystemLoader, TemplateNotFound
from imgur_extension import ImgurExtension

import settings
from models import Entry
from utils import build_url

logging.getLogger().setLevel(logging.WARNING)

template_dirs = []
template_dirs.append(os.path.join(os.path.dirname(__file__), 'templates'))

extensions = [ImgurExtension]
jinja2_env = Environment(loader=FileSystemLoader(template_dirs), extensions=extensions)
jinja2_env.globals.update(blog=settings.blog)

class MainHandler(webapp2.RequestHandler):
    def get(self):
        result = memcache.get("index")
        if result is None:
            result = self.render()
            if not memcache.add(key="index", value=result):
                logging.error("Memcache set failed.")

        self.response.out.write(result)

    def render(self):
        template = jinja2_env.get_template('index.html')
        return template.render(entries = db.Query(Entry).order('-published').fetch(limit=25))

class HookHandler(webapp2.RequestHandler):
    def post(self):
        try:
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
                    entry.content = jinja2_env.from_string(result.content.decode('utf-8')).render()
                else:
                    try:
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

class FeedHandler(webapp2.RequestHandler):
    def get(self):
        result = memcache.get("feed")
        if result is None:
            result = self.render()
            if not memcache.add(key="feed", value=result):
                logging.error("Memcache set failed.")

        self.response.headers["Content-Type"] = "application/atom+xml"
        self.response.out.write(result)

    def render(self):
        template = jinja2_env.get_template('atom.xml')
        return template.render(entries = db.Query(Entry).order('-published').fetch(limit=25))

class KeepAliveHandler(webapp2.RequestHandler):
    def get(self):
        pass

class ArchiveHandler(webapp2.RequestHandler):
    def get(self):
        result = memcache.get("archive")
        if result is None:
            result = self.render()
            if not memcache.add(key="archive", value=result):
                logging.error("Memcache set failed.")

        self.response.out.write(result)

    def render(self):
        template = jinja2_env.get_template('archive.html')
        return template.render(entries = db.Query(Entry).order('-published'))

class CodeHandler(webapp2.RequestHandler):
    def get(self):
        result = memcache.get("code")
        if result is None:
            result = self.render()
            if not memcache.add(key="code", value=result):
                logging.error("Memcache set failed.")

        self.response.out.write(result)

    def render(self):
        template = jinja2_env.get_template('code.html')
        return template.render()

class EntryHandler(webapp2.RequestHandler):
    def get(self, slug):
        result = memcache.get(slug)
        if result is None:
            entry = db.Query(Entry).filter("slug =", slug).get()
            if not entry:
                self.error(404)
                template = jinja2_env.get_template('404.html')
                result = template.render(entry=entry)
            else:
                template = jinja2_env.get_template('entry.html')
                result = template.render(entry = entry)

            if not memcache.add(key=slug, value=result):
                logging.error("Memcache set failed.")

        self.response.out.write(result)

class AboutHandler(webapp2.RequestHandler):
    def get(self):
        result = memcache.get("about")
        if result is None:
            result = self.render()
            if not memcache.add(key="about", value=result):
                logging.error("Memcache set failed.")

        self.response.out.write(result)

    def render(self):
        template = jinja2_env.get_template('about.html')
        return template.render()


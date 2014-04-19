#-*- coding: utf-8 -*-
from google.appengine.ext import db

class Entry(db.Model):
    title = db.StringProperty()
    slug = db.StringProperty()
    content = db.TextProperty()
    published = db.DateProperty(auto_now_add=True)
    tags = db.StringListProperty()


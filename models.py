# -*- coding: utf-8 -*-
from google.appengine.ext import db

class Entry(db.Model):
    title = db.StringProperty()
    slug = db.StringProperty()
    content = db.TextProperty()
    published = db.DateTimeProperty(auto_now_add=True)

class Category(db.Model):
    entry = db.ReferenceProperty(Entry, collection_name='categories')
    name = db.StringProperty()


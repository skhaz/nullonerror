#-*- coding: utf-8 -*-
from google.appengine.ext import db

class Entry(db.Model):
    title = db.StringProperty()
    slug = db.StringProperty()
    content = db.TextProperty()
    published = db.DateProperty(auto_now_add=True)
    # categories = db.ListProperty(db.Category)
    categories = db.StringListProperty()

    """
    def tag_cloud(self):
        tag_cloud = {}
        for entry in Entry.all()
            for tag in entry.tags:
                tag_cloud[tag] += 1
        return tag_cloud
    """


# -*- coding: utf-8 -*-
from settings import github

def build_url(filename):
    return "%s/%s" % ('/'.join([v for k,v in github.iteritems()]), filename)


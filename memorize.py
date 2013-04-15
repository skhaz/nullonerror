# -*- coding: utf-8 -*-

from google.appengine.api import memcache

class memorize():
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        key = '{}/{}'.format(self.func.__name__, '/'.join(kwargs.values()))
        result = memcache.get(key)
        if result is None:
            result = self.func(*args, **kwargs)
            memcache.add(key=key, value=result)

        return result


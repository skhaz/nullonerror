# -*- coding: utf-8 -*-
import webapp2
from views import *

application = webapp2.WSGIApplication([
        ('/hook', HookHandler),
        ('/feed', FeedHandler),
        ('/keepalive', KeepAliveHandler),
        ('/archive', ArchiveHandler),
        ('/code', CodeHandler),
        ('/about', AboutHandler),
        (r'/entry/([^/]+)', EntryHandler),
        ('/', MainHandler)
    ], debug=False)

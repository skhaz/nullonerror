# -*- coding: utf-8 -*-
import urllib, json
from jinja2 import nodes
from jinja2.ext import Extension
from google.appengine.api import urlfetch
from google.appengine.ext import db
from utils import build_url
from settings import imgur_key



class ImgurExtension(Extension):
    tags = set(['imgur'])

    def parse(self, parser):
        stream = parser.stream
        tag = stream.next()
        args = []

        while not stream.current.test_any('block_end', 'name:as'):
            if stream.current.test('name') or stream.look().test('assign'):
                key = nodes.Const(stream.next().value)
                stream.skip()
                value = parser.parse_expression()
                args.append(nodes.Pair(key, value, lineno=key.lineno))
            else:
              parser.parse_expression()

        def make_call_node(*kw):
            return self.call_method('_render_tag', args=[nodes.Dict(args)], kwargs=kw)

        return nodes.Output([make_call_node()]).set_lineno(tag.lineno)

    @classmethod
    def _render_tag(self, args):
        filename = args["src"]
        alt = args.get('alt', '')
        params = urllib.urlencode({"key" : imgur_key, "image" : build_url(filename)})
        result = urlfetch.fetch("http://api.imgur.com/2/upload.json", method=urlfetch.POST, payload=params)

        if result.status_code == 200:
            data = json.loads(result.content)
            upload = data["upload"]
            image = upload["image"]
            links = upload["links"]
            html = '<div class="centered"><a href="{href}"><img class="img-polaroid" width="{width}" height="{height}" src="{src}" alt="{alt}" /></a></div>'

            return html.format(href=links["imgur_page"], width=image["width"], height=image["height"], src=links["original"], alt=alt)


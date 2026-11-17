#!/usr/bin/env python3
"""Servidor local do disperfil com suporte a links /nome.

O site publicado usa rewrite para abrir index.html em qualquer caminho.
Este servidor faz o mesmo no desenvolvimento, para testar links como
http://127.0.0.1:4173/belly.
"""

import argparse
import os
import posixpath
import urllib.parse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        candidate = self.translate_path(parsed.path)
        if not os.path.exists(candidate) and "." not in posixpath.basename(parsed.path):
            self.path = "/index.html"
        return super().do_GET()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser(description="Servidor local do disperfil")
    parser.add_argument("--port", type=int, default=4173)
    parser.add_argument("--bind", default="127.0.0.1")
    args = parser.parse_args()
    server = ThreadingHTTPServer((args.bind, args.port), Handler)
    print(f"disperfil em http://{args.bind}:{args.port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()

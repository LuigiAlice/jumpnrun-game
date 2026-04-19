#!/usr/bin/env python3
"""Start a local web server to play the Jump & Run game."""
import http.server
import socketserver
import os
import webbrowser
import sys

PORT = 8000

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

print("=" * 50)
print("  Jump & Run Spiel starten...")
print("  Bitte warte, das Spiel öffnet sich gleich!")
print("=" * 50)
print()
print(f"Server läuft unter: http://localhost:{PORT}")
print("Drücke STRG+C um den Server zu stoppen")
print()

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        webbrowser.open(f"http://localhost:{PORT}")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer gestoppt.")
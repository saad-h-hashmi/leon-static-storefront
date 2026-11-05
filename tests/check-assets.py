#!/usr/bin/env python3
"""Check local HTML/CSS media references for missing files."""
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

class LocalReferences(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        for key in ("src", "href", "poster"):
            value = values.get(key, "")
            if value and not value.startswith(("http://", "https://", "mailto:", "tel:", "#", "data:", "javascript:")):
                self.paths.append(value)

html = (ROOT / "index.html").read_text(encoding="utf-8")
parser = LocalReferences()
parser.feed(html)
# Include local media paths embedded in app.js template literals and CSS url() rules.
for filename in ("app.js", "styles.css"):
    text = (ROOT / filename).read_text(encoding="utf-8")
    parser.paths.extend(re.findall(r"(?:images/)[A-Za-z0-9_.-]+", text))

missing = sorted({path for path in parser.paths if not (ROOT / path).is_file()})
if missing:
    print("Missing local assets:", *missing, sep="\n- ", file=sys.stderr)
    raise SystemExit(1)
print(f"PASS: checked {len(set(parser.paths))} local file references")

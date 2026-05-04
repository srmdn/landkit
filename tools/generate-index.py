#!/usr/bin/env python3
"""Scan templates/ folders and generate templates.json for the gallery."""
import json
from pathlib import Path

TEMPLATES_DIR = Path(__file__).resolve().parent.parent / "templates"
OUTPUT = Path(__file__).resolve().parent.parent / "templates.json"

def scan():
    entries = []
    for folder in sorted(TEMPLATES_DIR.iterdir()):
        if not folder.is_dir():
            continue
        manifest = folder / "manifest.json"
        preview = folder / "preview.png"
        if manifest.exists():
            data = json.loads(manifest.read_text())
        else:
            data = {
                "name": folder.name.replace("-", " ").title(),
                "description": "",
                "category": "uncategorized",
                "tags": []
            }
        data["folder"] = folder.name
        data["has_preview"] = preview.exists()
        entries.append(data)
    return entries

if __name__ == "__main__":
    entries = scan()
    OUTPUT.write_text(json.dumps(entries, indent=2) + "\n")
    print(f"Generated {OUTPUT} with {len(entries)} templates")

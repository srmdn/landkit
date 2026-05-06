#!/usr/bin/env python3
"""Scan templates/ folders and generate templates.json for the gallery."""
import json
from pathlib import Path

TEMPLATES_DIR = Path(__file__).resolve().parent.parent / "templates"
OUTPUT = Path(__file__).resolve().parent.parent / "templates.json"

FIELDS = ["name", "description", "category", "tags", "design_ref", "font", "palette", "features"]

# Preview image priority: webp first (smaller), then png
PREVIEW_CANDIDATES = ["preview.webp", "preview.png"]

def scan():
    entries = []
    for folder in sorted(TEMPLATES_DIR.iterdir()):
        if not folder.is_dir():
            continue
        manifest = folder / "manifest.json"
        if manifest.exists():
            data = json.loads(manifest.read_text())
        else:
            data = {
                "name": folder.name.replace("-", " ").title(),
                "description": "",
                "category": "uncategorized",
                "tags": []
            }
        # Only keep known fields
        entry = {k: data[k] for k in FIELDS if k in data}
        entry["folder"] = folder.name

        # Find preview image (prefer webp)
        preview_file = None
        for candidate in PREVIEW_CANDIDATES:
            if (folder / candidate).exists():
                preview_file = candidate
                break

        entry["has_preview"] = preview_file is not None
        entry["preview_file"] = preview_file  # e.g. "preview.webp" or "preview.png"
        entries.append(entry)
    return entries

if __name__ == "__main__":
    entries = scan()
    OUTPUT.write_text(json.dumps(entries, indent=2) + "\n")
    print(f"Generated {OUTPUT} with {len(entries)} templates")
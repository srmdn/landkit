# landkit

Open source landing page templates. No frameworks, no build steps, no bullshit.

## The problem

I needed a landing page. I don't want to pay $49 for a template. I don't want to `npm install` 800 dependencies. I don't want to learn Astro, Next.js, or whatever framework is trending this week.

I want a single HTML file I can open and edit. That's it.

## What this is

A collection of landing page templates. Each template is one folder with everything it needs. Copy the folder, open `index.html`, and start editing.

- Zero dependencies. Not even npm.
- Tailwind CSS via CDN. No build step.
- Self-contained. Every template stands alone.
- MIT licensed. Do whatever you want.

## Browse

**[srmdn.github.io/landkit](https://srmdn.github.io/landkit)** — full gallery with search and previews.

## Structure

```
templates/
├── saas-hero/
│   ├── index.html
│   ├── style.css
│   ├── preview.png
│   └── assets/
└── app-landing/
    └── ...
templates.json     # Auto-generated for gallery search
index.html         # Gallery browser
```

## Using a template

1. Browse the gallery
2. Find a template you like
3. Copy the folder
4. Open `index.html`
5. Edit the content

No `npm install`, no `npm run dev`, no build pipeline.

## Contributing

Got a good landing page design? Add it.

Guidelines:
- One folder per template
- Self-contained. No cross-template dependencies.
- Include a `preview.png` (1200x800 recommended)
- Use Tailwind CDN, not a local build
- Keep it under 2MB per template (images included)

## License

MIT

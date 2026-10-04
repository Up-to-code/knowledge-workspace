# Resource UI and source media

Keep the interface at Cursor's scale: system font, compact 13px controls, 280px expanded sidebar, 44px rail, and the compact bottom composer.

Resource previews must be actual source media. Use original images, original video thumbnails, or browser screenshots of the referenced page. Do not generate SVG covers, decorative gradients, abstract illustrations, or invented preview screenshots. Notes without media display as text. Small interface icons are fine.

Preserve source URL, creator attribution, media kind, and capture date. A post and each linked website are separate connected resources. Never use another post's media as a substitute. Record capture provenance in public/previews/sources.json.

If remote video playback is blocked, keep the real thumbnail and link to the original player. Do not download or proxy remote media to work around display restrictions. Unknown URLs remain unreviewed until their source is actually read. Never present template output as a model-generated summary or a fetch that did not run.

Use direct interface labels: Library, Images, Notes, Files, Editorial. Avoid promotional slogans, invented statistics, and generated decorations.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

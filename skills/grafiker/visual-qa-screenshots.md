---
name: visual-qa-screenshots
description: Use when grafiker needs automated screenshots, visual QA captures, before/after comparisons, or mobile/desktop render evidence.
---

# Visual QA Screenshots

Use browser screenshots as proof, not vibes. Prefer `shot-scraper` when installed; otherwise use Hermes browser/CDP or Playwright already available in the environment.

## Workflow

1. Define target: URL/file, viewport, element selector if any, output path.
2. Capture:
   - `shot-scraper <url> -o shot.png --width 1080 --height 1920`
   - selector: `shot-scraper <url> -s '<selector>' -o element.png`
3. If `shot-scraper` is missing, use browser/CDP screenshot tooling already available.
4. Review for: overflow, cropped text, bad contrast, tiny type, wrong aspect ratio, loading skeletons, cookie banners.
5. Deliver screenshot(s) plus one-line QA verdict.

## Defaults

- Mobile social: `1080x1920`.
- Desktop web: `1440x1000`.
- Crop only after full-page check.

## Common mistakes

- Do not rely on DOM text alone for visual deliverables.
- Do not screenshot before webfonts/images finish loading.
- Do not bury the proof in logs; attach the image or give the path.

# HANDOFF.md — Watchparty in der GG Open Lobby

## 1. Exact event facts

Use these facts exactly; do not invent or alter details:

- **Title:** Watchparty in der GG Open Lobby
- **Date:** Saturday, 14.11.2026
- **Times:** 19:00 / 20:00 (retain the source wording; clarify only if the owner supplies a schedule)
- **Venue:** Hauptstraße 240, Herne
- **Admission:** Eintritt frei

## 2. Design brief

Create a distinctive GG Open editorial social/carousel treatment at 1080×1350. Use the supplied Watch Party logo as the event identifier and the GG Open identity-core assets as the brand system. The Barmenia reference establishes only design logic—clear hierarchy, strong poster-like blocks, controlled contrast, and an immediately legible event message—not artwork, layout, characters, or branded elements to copy. Keep the result original, calm-sharp, and community-oriented.

Use the existing A_DIAGONAL direction as the selected route unless the owner explicitly changes direction. The included B_SPLIT and C_RADIAL files are structural alternatives, not approval to redesign the brief.

### Allowed

- Supplied Watch Party logo and relevant GG Open identity-core logos
- GG Open brand colors and typography documented in this repository
- Original geometric/editorial illustration and motion treatment
- The supplied reference post as a visual-logic reference only
- Local SVG/HTML/Chromium rendering

### Forbidden

- Riot, Red Bull, League of Legends, or other third-party marks/artwork unless separately cleared
- Copying Barmenia artwork, composition, characters, or distinctive graphic assets
- Invented event facts, sponsors, prices, guests, URLs, or claims
- Dark sci-fi/generic placeholder outputs from earlier iterations
- Secrets, tokens, private vault material, or unrelated brandkit material

**Old outputs: NO-GO.** Do not revive the previous dark-sci-fi or placeholder-copy variants.

## 3. File map

- `assets/final/slide1.svg`, `slide2.svg`, `slide3.svg` — final editable Green Arena SVGs
- `assets/final/slide1.html`, `slide2.html`, `slide3.html` — browser wrappers
- `assets/final/slide1.png`, `slide2.png`, `slide3.png` — 1080×1350 raster previews
- `assets/final/slide1_hook_corrected.mp4`, `slide2_facts_corrected.mp4` — corrected motion exports
- `assets/final/slide3_cta_corrected.png` — corrected static CTA export
- `assets/final/watchparty_logo_transparent.png` — extracted transparent logo used by the final SVGs
- `assets/final/watchparty_logo_source.jpg` — actual supplied logo source; **not** the unrelated dashboard image
- `assets/final/reference_post.jpg` — supplied reference post
- `assets/source/` — A_DIAGONAL, B_SPLIT, C_RADIAL SVG/HTML structural sources
- `brand/logos/` — relevant GG Open lobby/icon identity assets only
- `fonts/Poppins/` — redistributable Poppins files and `LICENSE-OFL.txt`
- `skills/` — selected, attributed Grafiker/Videograf procedural skills

## 4. Claude Code instructions

1. Read this file and `README.md` before editing.
2. Preserve the exact event facts and title casing.
3. Inspect `assets/final/` before changing direction; do not redesign without an explicit owner request.
4. Use only allowed assets and fonts. Never add third-party artwork or private files.
5. Keep source editable: update SVG/HTML first, then render PNG/video outputs.
6. Run the acceptance checklist below and report commands/output.
7. Do not commit local caches, credentials, generated browser profiles, or unrelated files.

## 5. Setup and render commands

No dependency installation is required to inspect the committed assets. Open any HTML wrapper in a browser for a quick preview. For new local renders, use the included SVG/HTML with Chromium/Playwright available in the working environment, at viewport **1080×1350**, device scale factor 1. Do not run a server or publish from this repository without owner approval.

The source project’s original build script is represented by the portable final assets; the original absolute-path build script is intentionally not copied. If implementing a new render script, read `assets/final/*.html` and write outputs beside the source files.

## 6. Font licensing notes

- **Poppins:** included in `fonts/Poppins/` under SIL Open Font License 1.1. Preserve `LICENSE-OFL.txt` when redistributing.
- **Intro / Intro Inline:** source brandkit files are not included because the repository did not have a redistributable license statement suitable for blind publication. Treat them as local-only and use a licensed copy supplied by the owner.
- **Bahnschrift:** do not redistribute blindly; treat as local-only/OS-provided unless the user supplies redistribution rights.
- Do not substitute unapproved fonts in final artwork. If the required font is unavailable, stop and report the licensing/blocking issue.

## 7. Acceptance checklist

- [ ] Exact title `Watchparty in der GG Open Lobby` is visible and correctly cased.
- [ ] Date, times, venue, and free-admission facts match Section 1.
- [ ] Final assets remain 1080×1350 where specified.
- [ ] Supplied Watch Party logo is used; unrelated dashboard image is not used as the logo.
- [ ] GG Open identity assets are limited to `brand/logos/` and documented fonts.
- [ ] Barmenia logic is used only as an abstract reference; no copied artwork.
- [ ] Old dark-sci-fi/placeholder outputs remain NO-GO.
- [ ] No Riot/Red Bull or other unlicensed third-party assets.
- [ ] PNG/video exports are visually checked for clipping, contrast, and legibility.
- [ ] No secrets, tokens, private paths, caches, or unrelated brandkit files are added.

## Provenance

Absolute source paths are intentionally kept in [`LOCAL_SOURCES.md`](LOCAL_SOURCES.md), separate from this portable brief.

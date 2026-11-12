---
name: video-pipeline-mlt
description: Use when editing video via MLT, melt, Shotcut, ffmpeg.
---

# Video pipeline: MLT / melt / ffmpeg / Shotcut

Use this for HermOS video editing/rendering where Hermes works headless and the user edits visually in Shotcut over RustDesk.

## Toolchain

Verified baseline on HermOS4 VPS:

```bash
ffmpeg -version
melt --version
shotcut --help
```

Known installed versions from validation:

- `ffmpeg 6.1.1`
- system `melt 7.22.0`
- Shotcut snap `26.8.1`
- Shotcut bundled melt: `/snap/shotcut/current/melt` (`melt 7.41.0` during validation)

`xvfb-run` may not be installed. Do not install system packages unless explicitly approved. If Qt/MLT asks for X11, use `QT_QPA_PLATFORM=offscreen` where it works or document that `xvfb-run -a ...` is needed.

## Shared project convention

Use `<local-video-projects>` for durable shared work:

```bash
mkdir -p <local-video-projects>/<project-name>/{src,mlt,renders,logs}
```

Recommended layout:

```text
<local-video-projects>/<project-name>/
  src/        # source media
  mlt/        # .mlt project files, edit interchange
  renders/    # mp4/mov outputs
  logs/       # render/probe logs
```

`.mlt` is the handoff artifact:

- Hermes/headless creates or patches `.mlt` XML.
- User opens the same `.mlt` in Shotcut GUI via RustDesk.
- Hermes renders the `.mlt` headless with `melt`.

Keep media paths relative to the `.mlt` root when possible, so the project folder can move as one unit.

## Generate MLT XML from clips

Example:

```bash
cd <local-video-projects>/demo/src
melt clipA.mp4 clipB.mp4 -consumer xml:../mlt/project.mlt all=1
```

Quick XML sanity check:

```bash
python3 - <<'PY'
import xml.etree.ElementTree as ET
ET.parse('<local-video-projects>/demo/mlt/project.mlt')
print('valid xml')
PY
```

## Headless render with system melt

Fast draft/default render:

```bash
cd <local-video-projects>/demo
melt mlt/project.mlt \
  -consumer avformat:renders/out.mp4 \
  vcodec=libx264 preset=veryfast acodec=aac \
  2>&1 | tee logs/render.log
```

Higher quality, slower:

```bash
melt mlt/project.mlt \
  -consumer avformat:renders/out-fast.mp4 \
  vcodec=libx264 preset=fast crf=20 acodec=aac \
  2>&1 | tee logs/render-fast.log
```

Verify output:

```bash
ffprobe -v error -show_entries format=duration,size \
  -of default=noprint_wrappers=1 renders/out.mp4
```

## Shotcut interop checks

Shotcut GUI help/headless parse smoke test without X11:

```bash
QT_QPA_PLATFORM=offscreen shotcut --help
```

Try opening a project headless/offscreen; timeout after startup is acceptable if logs show no XML parse failure:

```bash
QT_QPA_PLATFORM=offscreen timeout 8s shotcut \
  --appdata /tmp/shotcut-appdata \
  <local-video-projects>/demo/mlt/project.mlt \
  > <local-video-projects>/demo/logs/shotcut-open.log 2>&1
```

If the Qt module says X11 is required and `xvfb-run` exists:

```bash
xvfb-run -a shotcut --help
xvfb-run -a melt mlt/project.mlt -consumer avformat:renders/out.mp4 vcodec=libx264 preset=veryfast acodec=aac
```

Shotcut bundled melt can validate/render MLT too:

```bash
/snap/shotcut/current/melt mlt/project.mlt \
  -consumer avformat:renders/shotcut-melt.mp4 \
  vcodec=libx264 preset=veryfast acodec=aac
```

## ffmpeg batch operations

Probe media:

```bash
ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,r_frame_rate,duration \
  -of json src/input.mp4
```

Normalize to edit-friendly H.264/AAC:

```bash
ffmpeg -y -i src/input.mov \
  -c:v libx264 -preset veryfast -crf 20 \
  -c:a aac -b:a 160k \
  src/input-normalized.mp4
```

Batch normalize:

```bash
mkdir -p src/normalized
for f in src/*.{mp4,mov,mkv}; do
  [ -e "$f" ] || continue
  ffmpeg -y -i "$f" -c:v libx264 -preset veryfast -crf 20 -c:a aac -b:a 160k \
    "src/normalized/$(basename "${f%.*}").mp4"
done
```

## CLI-Anything harnesses

Install only in an isolated venv:

```bash
python3 -m venv /tmp/cli-anything-video-venv
. /tmp/cli-anything-video-venv/bin/activate
python -m pip install --upgrade pip
python -m pip install cli-anything-hub
cli-hub install shotcut
cli-hub install kdenlive
```

Useful commands:

```bash
cli-hub search video
cli-hub info shotcut
cli-hub info kdenlive

cli-anything-shotcut --json media probe <local-video-projects>/demo/src/clipA.mp4
cli-anything-shotcut --json project open <local-video-projects>/demo/mlt/project.mlt
cli-anything-shotcut --json --project <local-video-projects>/demo/mlt/project.mlt project info
cli-anything-shotcut --json --project <local-video-projects>/demo/mlt/project.mlt export presets
cli-anything-shotcut --json --project <local-video-projects>/demo/mlt/project.mlt export render <local-video-projects>/demo/renders/shotcut-cli.mp4

cli-anything-kdenlive --json project new -n demo --width 1280 --height 720 --fps-num 30 --fps-den 1 -o <local-video-projects>/demo/mlt/kdenlive-cli.json
cli-anything-kdenlive --json --project <local-video-projects>/demo/mlt/kdenlive-cli.json bin import <local-video-projects>/demo/src/clipA.mp4
cli-anything-kdenlive --json --project <local-video-projects>/demo/mlt/kdenlive-cli.json timeline add-track -n V1 --type video
cli-anything-kdenlive --json --project <local-video-projects>/demo/mlt/kdenlive-cli.json export presets
cli-anything-kdenlive --json --project <local-video-projects>/demo/mlt/kdenlive-cli.json export xml -o <local-video-projects>/demo/mlt/kdenlive-cli.mlt
```

Notes from validation:

- `cli-anything-shotcut` is JSON-steerable and renders through `melt`.
- `cli-anything-kdenlive` is JSON-steerable and can create JSON project state plus export MLT XML.
- Kdenlive timeline IDs are integers, not strings like `track0`.

## RAM / concurrency rules

This VPS has limited RAM. Render sequentially.

Rules:

- No parallel renders.
- Prefer `preset=veryfast` for drafts and automation.
- Use `preset=fast` only when output quality matters more than time.
- Avoid launching Shotcut GUI while a render is running.
- Keep large ffmpeg transcodes one at a time.
- Log every render under `logs/`.

## Minimal acceptance test

```bash
cd /tmp/melt-test
melt clipA.mp4 clipB.mp4 -consumer xml:cli_generated.mlt all=1
/snap/shotcut/current/melt cli_generated.mlt -consumer avformat:shotcut_melt_render.mp4 vcodec=libx264 preset=veryfast acodec=aac
QT_QPA_PLATFORM=offscreen timeout 8s shotcut --appdata /tmp/shotcut-appdata /tmp/melt-test/cli_generated.mlt >shotcut_open.log 2>&1 || true
melt project.mlt -consumer avformat:system_melt_render.mp4 vcodec=libx264 preset=veryfast acodec=aac
ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 shotcut_melt_render.mp4 system_melt_render.mp4
```

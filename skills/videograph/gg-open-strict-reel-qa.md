---
name: gg-open-strict-reel-qa
description: Use when reviewing a GG Open reel explicitly assigned STRICT mode.
version: 1.0.0
---

# GG Open STRICT Reel QA

## Hard Gate

Use this skill only when all conditions pass:

1. the task manifest has `creative_mode: STRICT`;
2. the manifest names this skill or an exact GG guideline/recipe path in `allowed_context`;
3. every brand asset and recipe to inspect is individually listed;
4. the manifest passes:

```bash
PYTHONPATH=<local-hermos4> python3 -m hermes.creative_lanes.validate_manifest MANIFEST --phase task
```

If any condition fails, stop brand QA and use only `vertical-reel-qa`. Do not search the brandkit, infer a compatibility path, or downgrade STRICT to CORE/FREE.

## Input Boundary

Read only the exact paths named by the validated manifest. A named recipe may live under the canonical archive path, for example:

```text
<local-hermos4>/brands/gg-open-brandkit/recipes-archive/reel-production/SKILL.md
```

A compatibility path is not permission. Prior campaigns, campaign outputs, and unrelated guidelines remain forbidden unless separately allowlisted.

## Review Order

1. Run neutral `vertical-reel-qa` first for format, audio, layout, legibility, black/freeze frames, facts, and delivery integrity.
2. List the exact STRICT sources and their checksums or commit identity.
3. Map each applicable requirement from those sources to a frame, DOM/pixel measurement, final-file probe, or explicit exception.
4. Report conflicts between recipe and current brief; the current brief wins only when the manifest records that override.
5. Validate the handoff manifest:

```bash
PYTHONPATH=<local-hermos4> python3 -m hermes.creative_lanes.validate_manifest MANIFEST --phase handoff
```

## Brand Checks

Check only rules present in the allowlisted sources, such as approved logo variant and clearspace, named palette roles, named fonts, required copy, motion recipe, endcard, or channel-specific safe areas. Do not import neighboring guidance.

## Verdict

- **PASS:** neutral QA passes and every applicable allowlisted STRICT rule has evidence.
- **FAIL:** identify the exact source path, rule, timestamp/frame, and smallest correction.
- **BLOCK:** source is missing, ambiguous, conflicting, or outside the manifest.

FREE cannot fail this skill because this skill must not run in FREE. CORE cannot use archived recipes unless the manifest is changed to explicit STRICT.

## Common Mistakes

| Mistake | Correction |
|---|---|
| Brand name implies permission | Require validated STRICT manifest. |
| Read the whole brandkit | Read exact allowlisted files only. |
| Recipe replaces neutral QA | Run neutral QA first. |
| Compatibility symlink grants access | Permission comes only from manifest path. |
| Old campaign defines current style | Treat prior campaigns as forbidden unless named. |

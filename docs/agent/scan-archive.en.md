---
hide:
  - footer
---

# Scanning archives

To scan archives for manifests, use the `--scan-archives` flag.

By default, scanning archives only works for one nesting level. To specify scanning depth, you need to add the `--scan-depth` parameter to the command or specify the `depth` variable in the `scan-archives` section in the config file.

Request example for scanning archives:

```bash
./johnny scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--ignore .tmp --ignore fixtures --ignore .git \
--scan-archives\
--scan-depth 2
```

Supported archive formats:

- `.jar`
- `.rar`
- `.tar`
- `.tar.bz2`
- `.tbz2`
- `.tar.gz`
- `.tgz`
- `.tar.xz`
- `.txz`
- `.war`
- `.zip`
- `.aar`
- `.egg`
- `.hpi`
- `.nupkg`
- `.whl`


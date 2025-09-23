---
hide:
 -footer
---

# CS-Proxy Changelog

### [2025.39.1] - 2025-09-23

#### Package Scanning
Two levels of scanning:
- **Manifest scanning** — analyzes and excludes versions blocked by security policies from the manifest
- **Package scanning** — analyzes downloaded package

#### Blocking Unsafe Components
- Policy-blocked versions are excluded from the manifest.
- Downloading of policy-blocked archives is prevented.
- A configurable status code with a blocking message in the status-line is returned.
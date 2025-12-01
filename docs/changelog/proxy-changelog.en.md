---
hide:
 - footer
---

# OSA Proxy Changelog

### [2025.48.0] - 2025-11-28

#### Fixed

- Исправлено применение политик безопасности для версий пакетов, данные о которых отсутствуют в CodeScoring Index на момент сканирования

### [2025.47.0] - 2025-11-19

#### Added

- Implemented support for [Go](/osa-proxy/config-go.en.md) and [Debian](/osa-proxy/config-debian.en.md) packages
- Introduced handling for DELAYED status
- Extended proxy server functionality to pass context via URL, enabling repository-bound policies to be applied in the `jfrog/nexus -> OSA proxy -> internet` configuration. For more detailed information, please refer to [documentation](/osa-proxy/base64-url.en.md)
- When requesting a manifest, if all package versions are blocked, a list of corresponding blocking policies is now displayed in the response

#### Fixed

- Resolved an issue that prevented policies from being applied to repositories in the `OSA proxy -> jfrog/nexus -> internet` configuration

### [2025.39.2] - 2025-10-22

#### Added

- Implemented metrics for each package manager type, available at `gateway.route.[maven|npm|nuget|pipy].requests`
- When all package versions in a manifest are blocked by the policies, the service now returns a correct error status and the reason for the block instead of an empty manifest
- Implemented warning (`Warn`) logging in case of incorrect configuration if the manifest does not contain links to packages using URLs from `repository.registry`. In rare cases, false positives may appear in the logs, which will be addressed if detected

#### Fixed

- Fixed an error that occurred during JFrog Artifactory requests to the actual `pypi` package index via the `/simple/` route
- In `warmup` & `spectator` modes, version blocking in manifests is no longer performed

### [2025.39.1] - 2025-09-23

#### Package scanning

Two levels of scanning:

- **Manifest scanning** — analyzes and excludes versions blocked by security policies from the manifest
- **Package scanning** — analyzes downloaded package

#### Blocking Unsafe Components

- Policy-blocked versions are excluded from the manifest.
- Downloading of policy-blocked archives is prevented.
- A configurable status code with a blocking message in the status-line is returned.
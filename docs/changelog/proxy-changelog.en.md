---
hide:
 - footer
---

# OSA Proxy Changelog

### [2026.5.1] - 2026-02-11

#### Added

- Implemented `docker.io` proxying via the `docker pull` command without the `library` prefix

#### Changed

- Replaced the `KEYS` command with `SCAN` for searching keys in Redis, allowing Redis to run in restricted privilege mode (`+@all -@dangerous`)
- Expanded manifest parsing logging: blocked package versions and applied blocking policies are now logged

#### Fixed

- Disabled forwarding of caching headers for HEAD requests, thus speeding up manifest refreshes in JFrog Artifactory and policy application


### [2026.5.0] - 2026-01-30

#### Added

- Added [metrics for CodeScoring requests](/osa-proxy/metrics.en/#codescoring-api-metrics)
- Added the ability to replace the URL in the blocking reason link with the one specified in the `OSA-Proxy` config `codescoring.host`. See [configuration](/osa-proxy/config.en)
- Added support for [APK](/osa-proxy/config-apk.en) and [RPM](/osa-proxy/config-rpm.en) repositories
- Added support for configuring `JAVA_OPTS` in the Helm chart. See [installation](/osa-proxy/installation.en)
- Added support for [Docker repositories](/osa-proxy/config-docker.en)

!!! note "Pulling official images"
    Pulling official images without the `library` prefix (e.g., `docker pull <osa-proxy-host>/postgres`) will be available in the next patch release. Currently, the full path must be used: `docker pull <osa-proxy-host>/library/postgres`

#### Changed

- Changed `gateway_route_<package_type>_requests_seconds` [metrics](/osa-proxy/metrics.en) from Histogram to SLO (10ms, 25ms, 50ms, 100ms, 250ms, 500ms, 1s, 2s, 5s)

#### Fixed

- Fixed operation with remote repositories behind **Cloudflare**, which resulted in error code 1101 from Cloudflare
- Fixed an error with adding the repository to the package name in `PURL` for Go

#### Removed

- Removed duplicate `gateway_route_` metric `http_server_requests`

### [2025.52.2] - 2026-01-19

#### Fixed

- Fixed the display of empty paths in the dependency tree that caused incorrect behavior in NuGet-cli. If component versions are blocked, their corresponding parent nodes are now also removed

### [2025.52.1] - 2026-01-15

#### Fixed

- Fixed an issue with Redis health check when cache is disabled

### [2025.52.0] - 2025-12-23

#### Added

- Added caching of policy checking results in Redis with TTL and background refresh support. See [documentation](/osa-proxy/config-caching.en)
- Added a proactive cache refresh mechanism based on a timer
- Added Swagger UI for API documentation (`/api/swagger`)
- Added REST API for cache management (`/api/cache`)
- Added header updates (`Last-Modified`, `ETag`) for manifests. This ensures manifests stay up to date with the latest security policies

#### Changed

- Increased default value of `max-in-memory-size` config variable from 50MB to 150MB (for processing large manifests)
- Optimized NPM manifest processing using a stream processor to increase processing speed for large files and reduce garbage collector load

### [2025.48.3] - 2025-12-08

#### Fixed

- Fixed the resource leak, which manifested immediately before the Garbage Collection (GC) cycle
- Fixed a behavior that caused the error `Connection prematurely closed BEFORE response` in cases where the connection was closed on the server side or by a reverse proxy

### [2025.48.2] - 2025-12-02

#### Fixed

- Fixed an issue where packages with a release date were blocked when the `Dependency release date is empty` policy was active

### [2025.48.0] - 2025-11-28

#### Fixed

- Fixed how security policies were applied to package versions whose data was missing from the CodeScoring Index at the time of scanning

### [2025.47.0] - 2025-11-19

#### Added

- Implemented support for [Go](/osa-proxy/config-go.en) and [Debian](/osa-proxy/config-debian.en) packages
- Introduced handling for DELAYED status
- Extended proxy server functionality to pass context via URL, enabling repository-bound policies to be applied in the `jfrog/nexus -> OSA proxy -> internet` configuration. For more detailed information, please refer to [documentation](/osa-proxy/base64-url.en)
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

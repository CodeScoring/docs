---
hide:
  - footer
---

# Overview

**CodeScoring Proxy** (repo-manager-proxy) is a proxy service that acts as an intermediary between package managers and their remote repositories. It integrates with the CodeScoring platform to enable automatic scanning of downloaded components and block insecure packages according to security policies.

The service intercepts requests made by package managers, forwards them to the original repositories, analyzes the resulting packages, modifies responses, and manages component access. It uses asynchronous processing, result caching, and automatic retry mechanisms in case of temporary failures. It also supports working with large files, with configurable buffer sizes.

## Supported Package Managers

CodeScoring Proxy handles requests to the following repositories:

- Maven Central (`https://repo1.maven.org`)
- NPM Registry (`https://registry.npmjs.org`)
- PyPI (`https://pypi.org`)
- NuGet Gallery (`https://api.nuget.org`)
- Docker Hub (`https://hub.docker.com/v2/`)

**Note**: alternative repositories implementing the official specification of the corresponding package manager are also supported (e.g. Nexus Repository, JFrog Artifactory).

## Key Features

### Package Scanning

Two levels of scanning are implemented for each ecosystem:

- **Manifest scanning** — analyzes package metadata (name, version, dependencies, licenses, release date);
- **Package scanning** — downloads and inspects the actual package files or images, including nested files and dependencies.

### Blocking Insecure Components

If a component violates a configured security policy:

- insecure versions are excluded from the list of available versions in manifests;
- downloads of relevant archives are blocked;
- a configurable HTTP status code is returned with a message explaining the reason for blocking.

### Response Modification

CodeScoring Proxy automatically modifies responses from original repositories:

- rewrites all URLs;
- removes blocked versions from metadata;
- recalculates checksums of modified manifests to ensure proper formatting.

## Operation Modes

The service's behavior is controlled via the `work-mode` parameter. Depending on the selected value, the logic for scanning, waiting, and blocking changes. The following mode is currently supported:

- `strict_wait` — waits for the scan to finish and blocks the component if any violation is found;
- other modes control behavior under timeouts and scanning errors.

## Error Handling

The service returns detailed error codes when requests are rejected:

- `blocked_by_policies` — the component is blocked by CodeScoring policies;
- `blocked_not_scanned` — the component has not yet been scanned;
- `failed_request` — error while contacting the CodeScoring installation;
- `blocked_scan_failed` — scanning failed;
- `blocked_scan_wait_timeout` — timeout while waiting for scan results;
- `blocked_registry_not_configured` — the repository is not registered in the CodeScoring installation.
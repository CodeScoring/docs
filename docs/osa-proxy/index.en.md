---
hide:
- footer
---

# Overview

**OSA Proxy** (repo-manager-proxy) is a proxy service that acts as an intermediary between package managers and their remote repositories. It integrates with the CodeScoring platform and provides automatic scanning of downloaded components and blocking of unsafe packages according to security policies.

The service intercepts requests made by package managers, sends them to the source repositories, analyzes the received packages, modifies the responses, and manages access to components.

The service is based on an asynchronous processing model and an automatic retry mechanism for temporary errors.

## Supported package managers

OSA Proxy handles requests to the following repositories:

- Maven Central (`https://repo1.maven.org/maven2`)
- NPM Registry (`https://registry.npmjs.org`)
- PyPI (`https://pypi.org`)
- NuGet V3 (`https://api.nuget.org`)
- Go (`https://proxy.golang.org/`)
- Debian (`https://ports.ubuntu.com/ubuntu-ports`)

!!! note "Support of alternative repositories"

    The service also supports alternative repositories that implement the official specifications of the corresponding package manager (for example, Nexus Repository and JFrog Artifactory).

## Main functionality

### Package scanning

Two scanning levels are implemented for each ecosystem:

- **Manifest scanning** — analyzes and excludes versions blocked by security policies from the manifest
- **Package scanning** — analyzes downloaded package

### Blocking insecure components

If a component violates security policy rules:

- Insecure versions are excluded from the list of available versions in the manifest;
- Downloading of corresponding archives is blocked;
- A configurable status code is returned with a message explaining the reason for the blocking.

### Response modification

OSA Proxy automatically modifies responses from original repositories:

- Redirects all URLs;
- Removes blocked versions from metadata;
- Recalculates checksums of modified manifests to maintain the correct format.

### Policy results caching

To speed up request processing and reduce platform load, policy validation results (verdicts from [Judge service](/on-premise/containers-description.en/)) are cached in Redis. Background updates of outdated records are supported.

## Work modes

Package scanning behavior is controlled by the `work-mode` parameter. Depending on the selected value, the scanning, waiting, and blocking logic changes. The following modes are supported:

- `warmup` – loads data into the CodeScoring cache without blocking components;
- `spectator` – loads data into the CodeScoring cache without blocking components, saving the results of component queries to the platform;
- `moderate` – blocks components that fail policy checks. Loading unscanned components is allowed;
- `strict` – blocks components that fail policy checks. Loading unscanned components is prohibited;
- `strict_wait` – blocks components that fail policy checks. Waiting for checks for unscanned components.
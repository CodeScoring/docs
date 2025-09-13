---
hide:
  - footer
---

# General Overview

The **CodeScoring Proxy** (repo-manager-proxy) is a proxy service that acts as an intermediary between package managers and their remote repositories. It integrates with the CodeScoring platform, ensuring that downloaded components are automatically scanned and that insecure packages are blocked in accordance with security policies.

The service intercepts requests from package managers, forwards them to the original repositories, analyzes the received packages, modifies the responses, and manages access to components. It uses an asynchronous processing model and an automatic retry mechanism for temporary errors.

## Supported Package Managers

CodeScoring Proxy processes requests to the following repositories:

- Maven Central (`https://repo1.maven.org/maven2`)
- NPM Registry (`https://registry.npmjs.org`)
- PyPI (`https://pypi.org`)
- NuGet V3 (`https://api.nuget.org`)
- Docker Hub (`https://hub.docker.com/v2/`)

**Important**: The proxy also supports alternative repositories that implement the official specifications of the corresponding package manager (e.g., Nexus Repository and JFrog Artifactory).

## Key Features

### Package Scanning

Two levels of scanning are implemented for each ecosystem:

- **Manifest Scanning** — Analyzes and excludes versions blocked by security policies from the manifest.
- **Package Scanning** — Analyzes the downloaded package files or images.

### Blocking Insecure Components

If a component violates security policy rules:

- Insecure versions are excluded from the list of available versions in the manifest.
- The download of the corresponding archive is blocked.
- A customizable status code and a message explaining the reason for the block are returned.

### Response Modification

CodeScoring Proxy automatically modifies responses from original repositories:

- It rewrites all URLs.
- It removes blocked versions from the metadata.
- It recalculates checksums of modified manifests to maintain the correct format.


## Operating Modes

The behavior of package scanning is controlled by the `work-mode` parameter. The logic for processing scanning, waiting, and blocking changes depending on the selected value. The following modes are supported:

- `warmup` – Downloads data into the CodeScoring cache without blocking components.
- `spectator` – Downloads data into the CodeScoring cache without blocking components, and saves the results of component requests for analysis.
- `moderate` – Blocks components that fail policy checks. Unscanned components are allowed to be downloaded.
- `strict` – Blocks components that fail policy checks. Unscanned components are not allowed to be downloaded.
- `strict_wait` – Blocks components that fail policy checks. Waits for unscanned components to be verified.
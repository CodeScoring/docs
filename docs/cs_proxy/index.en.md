# CodeScoring Proxy

CodeScoring Proxy (repo-manager-proxy) is a proxy service built on Spring Cloud Gateway that acts as an intermediary between package managers and their repositories. The service integrates with the CodeScoring platform for scanning and blocking unsafe packages.

## Supported Package Managers

The service proxies requests to the following repositories:

* Maven Central (`https://repo1.maven.org`)
* NPM Registry (`https://registry.npmjs.org`)
* PyPI (`https://pypi.org`)
* NuGet Gallery (`https://api.nuget.org`)
* Docker (`https://hub.docker.com/v2/`)

!!! note "Alternative Repository Support"
    Repositories that implement the official specification of the corresponding package manager (e.g., Nexus, JFrog) are also supported.

## Core Features

### Package Scanning

Two types of scanning are implemented for each package manager:

* **Manifest Scanning** - checking package metadata
* **Package Scanning** - checking package files themselves

### Blocking Unsafe Packages

When security issues are detected, the service:

* Removes unsafe versions from available version lists in manifests
* Blocks downloading of unsafe package files
* Returns a configurable status code with a blocking reason description

### Response Modification

The service automatically modifies responses from original repositories:

* Redirects URLs through the proxy
* Removes blocked versions from metadata
* Updates checksums for modified manifests

## Operating Modes

The service supports various operating modes via the `work-mode` parameter:

* `strict_wait` - waits for scanning completion, blocks on any issues
* Other modes affect behavior during timeouts and scanning errors

## Error Handling

The service provides detailed error messages:

* `blocked_by_policies` - blocked by CodeScoring policies
* `blocked_not_scanned` - component not yet scanned
* `failed_request` - error when requesting CodeScoring
* `blocked_scan_failed` - scanning error
* `blocked_scan_wait_timeout` - scanning wait timeout
* `blocked_registry_not_configured` - repository not configured in CodeScoring

## Implementation Features

1. **Caching**: Scanning results are cached to reduce load on CodeScoring API
2. **Asynchronous Processing**: Using Spring WebFlux reactive approach
3. **Retry Mechanism**: Automatic retries for temporary failures
4. **Large File Support**: Configurable buffer size for handling large packages

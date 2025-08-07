---
hide:
  - footer
---

# Service сonfiguration

## Main зarameters

CodeScoring Proxy is configured via the `application.yml` file:

```yaml
# CodeScoring settings
codescoring:
  host: CodeScoring server URL
  token: authorization token
  work-mode: work mode (e.g., strict_wait)
  proxy-manager-host: proxy manager host
  enable-status-line: enable status line

# PyPI configuration
pypi:
  enabled: true/false
  registry: main registry URL
  packages-registry: URL for downloading packages
  repository:
    - name: repository name
      project: CodeScoring project
      scan-manifest: true/false
      scan-package: true/false

# Maven configuration
maven:
  enabled: true/false
  registry: registry URL
  repository:
    - name: repository name
      project: CodeScoring project
      scan-manifest: true/false
      scan-package: true/false

# NPM configuration
npm:
  enabled: true/false
  registry: registry URL
  repository:
    - name: repository name
      project: CodeScoring project
      scan-manifest: true/false
      scan-package: true/false

# NuGet configuration
nuget:
  enabled: true/false
  registry: registry URL
  repository:
    - name: repository name
      project: CodeScoring project
      scan-manifest: true/false
      scan-package: true/false
````

## Additional Settings

- Logging level configuration
- Buffer size for handling large files
- Caching of scan results (Caffeine cache)
- Retry policies for requests to CodeScoring

# Configuration

## Main Parameters

Service configuration is done through the `application.yml` file:

```yaml
# CodeScoring Parameters
codescoring:
  host: CodeScoring server URL
  token: authorization token
  work-mode: operating mode (e.g., strict_wait)
  proxy-manager-host: proxy manager host
  enable-status-line: enable status line

# PyPI Configuration
pypi:
  enabled: true/false
  registry: main registry URL
  packages-registry: URL for package downloads
  repository:
    - name: repository name
      project: project in CodeScoring
      scan-manifest: true/false
      scan-package: true/false

# Maven Configuration
maven:
  enabled: true/false
  registry: registry URL
  repository:
    - name: repository name
      project: project in CodeScoring
      scan-manifest: true/false
      scan-package: true/false

# NPM Configuration
npm:
  enabled: true/false
  registry: registry URL
  repository:
    - name: repository name
      project: project in CodeScoring
      scan-manifest: true/false
      scan-package: true/false

# NuGet Configuration
nuget:
  enabled: true/false
  registry: registry URL
  repository:
    - name: repository name
      project: project in CodeScoring
      scan-manifest: true/false
      scan-package: true/false
```

## Additional Settings

* Log level configuration
* Buffer size configuration for large file handling
* Scanning results caching (Caffeine cache)
* Retry policy configuration for CodeScoring requests

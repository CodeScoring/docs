---
hide:
  - footer
---

# Service configuration

## Main parameters

CodeScoring Proxy is configured via the `application.yml` file:

```yaml
# CodeScoring settings
codescoring:
  host: CodeScoring server URL
  token: authorization token
  work-mode: work mode (applies only to package scan)
              # warmup | Scan cache warmup without requests monitoring, no blocking
              # spectator | Scan cache warmup with requests monitoring, no blocking
              # moderate | Policy-based blocking using cache results, not scanned component downloads allowed
              # strict | Policy-based blocking using cache results, not scanned component downloads blocked
              # strict_wait | Policy-based blocking, wait until component is scanned
  proxy-manager-host: proxy host
  enable-status-line: true/false (adds blocking reason message to the status line)
  block-status-code: status code for blocked packages
  block-on-codescoring-errors: block on CodeScoring errors such as 5xx status, failed scan or not configured docker registry

# PyPI configuration
pypi:
  enabled: true
  repository:
    - name: internet-pypi
      scan-manifest: true
      scan-package: true
      registry: https://pypi.org
      packages-registry: https://files.pythonhosted.org
    - name: arti-pypi
      scan-manifest: true
      scan-package: true
      registry: http://localhost:8081/artifactory/api/pypi/pypi-remote
      packages-registry: http://localhost:8081/artifactory/api/pypi/pypi-remote/packages
    - name: nexus-pypi
      scan-manifest: true
      scan-package: true
      registry: https://localhost:8081/repository/pypi-proxy
      packages-registry: https://localhost:8081/repository/pypi-proxy/packages

# Maven configuration
maven:
  enabled: true
  repository:
    - name: internet-mvn
      scan-manifest: true
      scan-package: true
      registry: https://repo1.maven.org/maven2
    - name: arti-mvn
      scan-manifest: false
      scan-package: true
      registry: http://localhost:8081/artifactory/maven-remote
    - name: nexus-mvn
      scan-manifest: false
      scan-package: true
      registry: http://localhost:8081/repository/maven-proxy

# NPM configuration
npm:
  enabled: true
  repository:
    - name: internet-npm
      scan-package: true
      scan-manifest: true
      registry: https://registry.npmjs.org
    - name: arti-npm
      scan-package: true
      scan-manifest: true
      registry: http://localhost:8081/artifactory/api/npm/npm-remote
    - name: nexus-npm
      scan-package: true
      scan-manifest: true
      registry: http://localhost:8081/repository/npm-proxy

# NuGet configuration
nuget:
  enabled: true
  repository:
    - name: codescoring-nuget
      scan-package: true
      registry: https://api.nuget.org
    - name: arti-nuget
      scan-package: true
      registry: http://localhost:8081/artifactory/api/nuget/v3/nuget-remote
    - name: nexus-npm
      scan-package: true
      scan-manifest: true
      registry: http://localhost:8081/repository/npm-proxy

````

## Additional Settings

### Logging level configuration
```yaml
logging:
  level:
    ru:
      codescoring: info
```

### Buffer size for handling large manifests

```yaml
spring:
  http:
    codecs:
      max-in-memory-size: 50MB (this is default setting already included in the application, increase in case you face remarkably large manifests)
```
### Retry policies and Circuit breaker for requests to CodeScoring:

### Retry Configuration
This configuration defines the retry policy for the codeScoringApi service. It's set to handle transient failures by re-attempting a request up to 3 times. The retries use an exponential backoff strategy, starting with a 1-second delay and doubling with each attempt. This policy only applies to specific exceptions like WebClientRequestException.

### Circuit Breaker Configuration
The circuit breaker for codeScoringApi acts as a fail-fast mechanism. It monitors the failure rate and, if it reaches 50% (calculated over the last 20 calls), it "opens" and prevents further requests for 30 seconds. This gives the downstream service time to recover. After the wait period, it enters a "half-open" state, allowing 5 trial calls to pass through to determine if the service has recovered.

Retry and Circuit Breaker configuration can be overridden by setting the following properties for instance `codeScoringApi`:
https://resilience4j.readme.io/docs/getting-started-3
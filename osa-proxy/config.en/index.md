- [Русский](https://docs.codescoring.ru/osa-proxy/config/index.md)

# Service configuration

## Main parameters

Configuration of **OSA Proxy** is done via the `application.yml` file:

Example configuration file

```
# CodeScoring parameters
codescoring:
  host: CodeScoring server URL
  token: authorization token ((with access level User or higher)
  work-mode: operation mode (applies only to package scanning)
              # warmup | Warm up scan cache without monitoring requests, no blocking
              # spectator | Warm up scan cache with request monitoring, no blocking
              # moderate | Policy-based blocking using cache results, unscanned components allowed
              # strict | Policy-based blocking using cache results, unscanned components blocked
              # strict_wait | Policy-based blocking, wait until the component is scanned
  proxy-manager-host: proxy server host
  enable-status-line: true/false (adds the block reason to the status line)
  block-status-code: status code for blocking package downloads
  block-on-codescoring-errors: block package download on 5xx status, scan_failed errors
  override-block-url: true/false (replaces URL in block reason link with the one specified in codescoring.host)
# PyPI settings
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
# Maven settings
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
# NPM settings
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
# NuGet settings
nuget:
  enabled: true
  repository:
    - name: codescoring-nuget
      scan-package: true
      registry: https://api.nuget.org
    - name: arti-nuget
      scan-package: true
      registry: http://localhost:8081/artifactory/api/nuget/v3/nuget-remote
    - name: nexus-nuget
      scan-package: true
      scan-manifest: true
      registry: http://localhost:8081/repository/nuget-v3-proxy
# GO settings
go:
   enabled: true
   repository:
     - name: codescoring-go
       scan-manifest: true
       scan-package: true
       url-encoded-config: true
       registry: https://proxy.golang.org/
     - name: arti-go
       scan-package: true
       scan-manifest: true
       url-encoded-config: true
       registry: http://localhost:8081/artifactory/api/go/go-virt
     - name: nexus-go
       scan-package: true
       scan-manifest: true
       url-encoded-config: true
       registry: http://localhost:8081/repository/go-proxy/
# Debian settings
debian:
  enabled: true
  repository:
    - name: codescoring-debian
      scan-package: true
      url-encoded-config: true
      registry: https://ports.ubuntu.com/ubuntu-ports/
      distro: plucky
    - name: arti-debian
      scan-package: true
      url-encoded-config: true
      registry: http://localhost:8081/artifactory/debian-remote
      distro: plucky
    - name: nexus-debian
      scan-package: true
      url-encoded-config: true
      registry: http://localhost:8081/repository/debian11
      distro: bullseye
# Alpine (APK) settings
alpine:
  enabled: true
  repository:
    - name: codescoring-alpine
      scan-package: true
      registry: https://dl-cdn.alpinelinux.org/alpine
    - name: arti-alpine
      scan-package: true
      registry: http://localhost:8081/artifactory/alpine-remote
# RPM settings
rpm:
  enabled: true
  repository:
    - name: codescoring-rpm
      scan-package: true
      registry: https://repo.almalinux.org/almalinux
    - name: arti-rpm
      scan-package: true
      registry: http://localhost:8081/artifactory/rpm-remote
# Docker Registry settings
docker:
  enabled: true
  repository:
    - name: codescoring-docker
      scan-package: true
      registry: https://registry-1.docker.io
    - name: arti-docker
      scan-package: true
      registry: http://localhost:8081/artifactory/docker-remote
```

Specifics of working in Nexus Repository and JFrog Artifactory

- For JFrog Artifactory, it is recommended to set a `Custom Base URL` and use it in the `registry` field to correctly replace package references within manifests.
- In the configuration `package manager` -> `jfrog` -> `OSA proxy` -> `internet`, in the additional JFrog repository settings, it is necessary to set the `Bypass HEAD requests flag`.
- There is no identical functionality for Nexus Repository; the host and port (if specified) from the request will be used in manifests. If a `reverse proxy` is available, it is recommended to use its link. For example: `registry: https://nexushost.ru/repository/pypi-proxy`.

## Additional settings

### Logging level settings

Example logging configuration

```
logging:
  level:
    ru:
      codescoring: info
```

### Buffer size for large manifests

Example buffer size configuration

```
spring:
  http:
    codecs:
      max-in-memory-size: 150MB (this is the default setting, already included in the application; increase it if you encounter very large manifests)
```

## Retry policies and circuit breaker for platform requests

### Retry configuration

This configuration defines the retry policy for the `codeScoringApi` service. It is designed to handle temporary failures by retrying up to 3 times.

Retries use an exponential backoff strategy, starting with a 1-second delay and doubling it with each attempt. This policy applies only to certain exceptions, such as `WebClientRequestException`.

### Circuit breaker configuration

The circuit breaker for `codeScoringApi` acts as a fail-fast mechanism. It tracks failure rates, and if they reach 50% (calculated over the last 20 calls), it “opens” and prevents further requests for 30 seconds. This gives the downstream service time to recover. After the wait period, it switches to “half-open” state, allowing 5 trial calls to check if the service has recovered.

Retry and circuit breaker configuration can be overridden by setting [the following properties](https://resilience4j.readme.io/docs/getting-started-3), for example, for `codeScoringApi`.

### Adding truststore certificates

Example of adding truststore certificates in application.yml

```
spring:
  cloud:
    gateway:
      server:
        webflux:
          httpclient:
            ssl:
              trustedX509Certificates:
                - /usr/local/share/ca-certificates/codescoring.crt
                - /etc/ssl/certs/ca-certificates.crt
```

### Adding http proxy

Example of http proxy configuration

```
spring:
  cloud:
    gateway:
      httpclient:
        proxy:
          host: proxy.host.ru
          username: 'username'
          port: 9091
          password: 'password'
          non-proxy-hosts-pattern: '(localhost|127.0.0.1|.*\.internal\.com)'
```

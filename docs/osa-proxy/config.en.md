---
hide:
  - footer
---

# Service configuration

## Main parameters

Configuration of **OSA Proxy** is done via the `application.yml` file:

!!! example "Example configuration file"

    ```yaml
    # CodeScoring parameters
    codescoring:
      host: CodeScoring server URL
      token: authorization token
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
    ```

!!! warning "Specifics of working in Nexus Repository and JFrog Artifactory"

    - For JFrog Artifactory, it is recommended to set a `Custom Base URL` and use it in the `registry` field to correctly replace package references within manifests.
    - There is no identical functionality for Nexus Repository; the host and port (if specified) from the request will be used in manifests. If a `reverse proxy` is available, it is recommended to use its link. For example: `registry: https://nexushost.ru/repository/pypi-proxy`.

## Deployment

Following the configuration of the `application.yml` file, the application can be deployed and executed either within a Docker container environment or orchestrated via a Helm chart for Kubernetes (k8s) deployments.

**1. Docker Container Deployment:**

To instantiate the application as a Docker container, execute the following command.

``` bash
docker run -d \
-p 8080:8080 \
-e SPRING_CONFIG_ADDITIONAL_LOCATION=file:/app/config/ \
-v /path/to/your/config/application.yml:/app/config/application.yml \
--name cs-proxy \
<registry-address>/cs-proxy:<tag>
```

**2. Kubernetes Deployment (Helm Chart):**

For Kubernetes environments, the application can be deployed using the provided Helm chart, accessible at `https://{REGISTRY_URL}/repository/helm/`.


## Additional settings

### Logging level settings

!!! example "Example logging configuration"

    ```yaml
    logging:
      level:
        ru:
          codescoring: info
    ```

### Buffer size for large manifests

!!! example "Example buffer size configuration"

    ```yaml
    spring:
      http:
        codecs:
          max-in-memory-size: 50MB (this is the default setting, already included in the application; increase it if you encounter very large manifests)
    ```

## Retry policies and circuit breaker for platform requests

### Retry configuration

This configuration defines the retry policy for the `codeScoringApi` service. It is designed to handle temporary failures by retrying up to 3 times.

Retries use an exponential backoff strategy, starting with a 1-second delay and doubling it with each attempt. This policy applies only to certain exceptions, such as `WebClientRequestException`.

### Circuit breaker configuration

The circuit breaker for `codeScoringApi` acts as a fail-fast mechanism. It tracks failure rates, and if they reach 50% (calculated over the last 20 calls), it “opens” and prevents further requests for 30 seconds. This gives the downstream service time to recover. After the wait period, it switches to “half-open” state, allowing 5 trial calls to check if the service has recovered.

Retry and circuit breaker configuration can be overridden by setting [the following properties](https://resilience4j.readme.io/docs/getting-started-3), for example, for `codeScoringApi`.

### Adding truststore certificates

!!! example "Example of adding truststore certificates in application.yml"

```yaml
spring:
  cloud:
    gateway:
      server:
        webflux:
          httpclient:
            ssl:
              trustedX509Certificates:
                - /usr/local/share/ca-certificates/solarrt.crt
                - /etc/ssl/certs/ca-certificates.crt
```

yaml spring: cloud: gateway: server: webflux: httpclient: ssl: trustedX509Certificates: - /usr/local/share/ca-certificates/solarrt.crt - /etc/ssl/certs/ca-certificates.crt```

Конечно, вот перевод:

## Proxy Configuration and Package Manager Repository Migration

**Use Case:** Migrating an `npm` repository from Artifactory to CS Proxy.

**Original `.npmrc` file:**

```textmate
registry=https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:_password=1NHTGVrUnJQ
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:username=asdf
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:email=asdf@domain.ru
//artifactory.domain.ru/artifactory/api/npm/npm-remote/:always-auth=true
```

The following repository definition needs to be added to the service's YAML configuration (the application.yml file) under the npm section. A service restart is required to apply the changes.

```yaml
npm:
  enabled: true
  repository:
    - name: arti-npm
      scan-package: true
      scan-manifest: true
      registry: https://artifactory.domain.ru/artifactory/api/npm/npm-remote/
```



Updated .npmrc file:

```textmate
registry=https://cs-proxy.domain.ru/arti-npm
//cs-proxy.domain.ru/arti-npm/:_password=1NHTGVrUnJQ
//cs-proxy.domain.ru/arti-npm/:username=asdf
//cs-proxy.domain.ru/arti-npm/:email=asdf@domain.ru
//cs-proxy.domain.ru/arti-npm/:always-auth=true
```


The following table provides a summary of repository URL redirection for various package managers. Authentication parameters and other configurations, such as username and password, remain unchanged.

### NuGet

| Source              | Before                                                        | After                                                    | nuget.repository.registry                                   |
|---------------------|---------------------------------------------------------------|----------------------------------------------------------|-------------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/nuget.org-proxy/index.json` | `https://cs-proxy.ru/nexus-nuget/nuget-api/index.json`   | `https://nexus.host.ru/repository/nuget.org-proxy`          |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe`   | `https://cs-proxy.ru/arti-nuget/nuget-api`               | `https://jfrog.host.ru/artifactory/api/nuget/v3/nuget-safe` |
| Official Repository | `https://api.nuget.org/v3/index.json`                         | `https://cs-proxy.ru/inet-nuget/nuget-api/v3/index.json` | `https://api.nuget.org`                                     |

### NPM

| Source              | Before                                                 | After                           | npm.repository.registry                                |
|---------------------|--------------------------------------------------------|---------------------------------|--------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/npm-proxy`           | `https://cs-proxy.ru/nexus-npm` | `https://nexus.host.ru/repository/npm-proxy`           |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` | `https://cs-proxy.ru/jfrog-npm` | `https://jfrog.host.ru/artifactory/api/npm/npm-remote` |
| Official Repository | `https://registry.npmjs.org`                           | `https://cs-proxy.ru/inet-npm`  | `https://registry.npmjs.org`                           |

### Maven

| Source              | Before                                           | After                           | maven.repository.registry                        |
|---------------------|--------------------------------------------------|---------------------------------|--------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/maven-remote`  | `https://cs-proxy.ru/nexus-mvn` | `https://nexus.host.ru/repository/maven-remote`  |
| Artifactory         | `https://jfrog.host.ru/artifactory/maven-remote` | `https://cs-proxy.ru/jfrog-npm` | `https://jfrog.host.ru/artifactory/maven-remote` |
| Official Repository | `https://repo.maven.apache.org/maven2`           | `https://cs-proxy.ru/inet-mvn`  | `https://repo.maven.apache.org/maven2`           |

### PyPI

| Source              | Before                                                          | After                                   | pypi.repository.registry                                 |
|---------------------|-----------------------------------------------------------------|-----------------------------------------|----------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/pip-remote`                   | `https://cs-proxy.ru/nexus-pypi/simple` | `https://nexus.host.ru/repository/pip-remote`            |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple` | `https://cs-proxy.ru/jfrog-pypi`        | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote` |
| Official Repository | `https://pypi.org/simple`                                       | `https://cs-proxy.ru/inet-pypi/simple`  | `https://pypi.org`                                       |
```

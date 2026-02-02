---
hide:
  - footer
---

# Alpine Package Configuration

## Repository URL Migration

**Use case:** Migration of Alpine repositories from direct sources to an OSA Proxy server.

The following table summarizes the redirection of repository URLs for Alpine.

| Source          | URL in `repositories` before migration            | URL in `repositories` after migration  | `application.yml` alpine.repository.registry      |
|-----------------|---------------------------------------------------|----------------------------------------|---------------------------------------------------|
| Nexus           | `https://nexus.host.ru/repository/alpine-proxy`   | `https://{osa-proxy-url}/nexus-alpine` | `https://nexus.host.ru/repository/alpine-proxy`   |
| Artifactory     | `https://jfrog.host.ru/artifactory/alpine-remote` | `https://{osa-proxy-url}/jfrog-alpine` | `https://jfrog.host.ru/artifactory/alpine-remote` |
| Official Alpine | `https://dl-cdn.alpinelinux.org/alpine`           | `https://{osa-proxy-url}/inet-alpine`  | `https://dl-cdn.alpinelinux.org/alpine`           |

## APK Repository Migration

**Original file `/etc/apk/repositories`:**

```shell
https://dl-cdn.alpinelinux.org/alpine
```

The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) in the alpine section. The service must be restarted for the changes to take effect.

**Configuration in `application.yml` file**

```yaml
alpine:
  enabled: true
  repository:
    - name: codescoring-alpine
      scan-package: true
      registry: https://dl-cdn.alpinelinux.org/alpine
```

After configuring the proxy server and adding it to `application.yml`, your repositories file will look like this:

```shell
https://{osa-proxy-url}/codescoring-alpine
```

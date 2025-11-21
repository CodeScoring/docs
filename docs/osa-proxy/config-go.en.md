---
hide:
  - footer
---

# Go Configuration

## Go Proxy Migration

**Use case:** Migrating Go to use an OSA Proxy instead of direct access or external public proxies.

The following table summarizes URL redirection for the Go proxy. Authentication parameters and other settings (if applicable, e.g., for private repositories requiring specific credentials) should be configured separately in accordance with your corporate policies (e.g., via `.netrc` or SSH keys).

| Module Source / Repository | `GOPROXY` before migration                 | `GOPROXY` after migration         |
|----------------------------|--------------------------------------------|-----------------------------------|
| Nexus                      | `https://nexus.host.ru/repository/go-remote` | `https://{osa-proxy-url}/nexus-go` |
| Artifactory                | `https://jfrog.host.ru/artifactory/api/go/go-virt` | `https://{osa-proxy-url}/arti-go`  |
| Official Go Proxy          | `https://proxy.golang.org`                 | `https://{osa-proxy-url}/inet-go`  |

## Go Proxy Migration Details

### Environment Configuration Before Migration

Before migration, your `GOPROXY` might have been set to the public Go proxy (`https://proxy.golang.org`) or not set at all, which would default to using `proxy.golang.org`.
The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) in the `go` section. A service restart is required for the changes to take effect.

**Configuration in `application.yml` file**

```yaml
apt:
  enabled: true
  repository:
    - name: inet-go
      scan-package: true
      registry: https://proxy.golang.org
```

Example of current environment variable configuration (e.g., in `.bashrc`, `.zshrc` file, or in a CI/CD pipeline):

```bash
export GOPROXY=https://{osa-proxy-url}/inet-go
```
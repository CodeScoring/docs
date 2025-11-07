---
hide:
  - footer
---

# PyPI Configuration

## Repository URL migration

**Use case:** migrating a PyPI repository from Artifactory to OSA Proxy.

The following table provides a summary of repository URL redirection for PyPI. Authentication parameters and other configurations, such as username and password, remain unchanged.

| Source              | pip.conf / pip.ini URL before migration                         | pip.conf / pip.ini URL after migration  | `application.yml` pypi.repository.registry               |
|---------------------|-----------------------------------------------------------------|-----------------------------------------|----------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/pip-remote`                   | `https://{osa-proxy-url}/nexus-pypi/simple` | `https://nexus.host.ru/repository/pip-remote`            |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple` | `https://{osa-proxy-url}/jfrog-pypi/simple` | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote` |
| Official Repository | `https://pypi.org/simple`                                       | `https://{osa-proxy-url}/inet-pypi/simple`  | `https://pypi.org`                                       |

## PyPI registry migration

**Original `pip.conf` (Linux/macOS) or `pip.ini` (Windows) file:**

```ini
[global]
index-url = https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple
trusted-host = jfrog.host.ru

[install]
trusted-host = jfrog.host.ru
```

Or with authentication:

```ini
[global]
index-url = https://username:password@jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple
trusted-host = jfrog.host.ru

[install]
trusted-host = jfrog.host.ru
```

The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) under the pypi section. A service restart is required to apply the changes.

**Configuration in `application.yml` file**

```yaml
pypi:
  enabled: true
  repository:
    - name: jfrog-pypi
      scan-manifest: true
      scan-package: true
      registry: https://jfrog.host.ru/artifactory/api/pypi/pypi-remote
      packages-registry: https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/packages
```

**Updated `pip.conf` (Linux/macOS) or `pip.ini` (Windows) file:**

```ini
[global]
index-url = https://{osa-proxy-url}/jfrog-pypi
trusted-host = {osa-proxy-url}

[install]
trusted-host = {osa-proxy-url}
```

Or with authentication:

```ini
[global]
index-url = https://username:password@{osa-proxy-url}/jfrog-pypi
trusted-host = {osa-proxy-url}

[install]
trusted-host = {osa-proxy-url}
```

### Configuration file locations

- **Linux/macOS**: `~/.config/pip/pip.conf` or `~/.pip/pip.conf`
- **Windows**: `%APPDATA%\pip\pip.ini` or `%HOME%\pip\pip.ini`
- **Per-virtualenv**: `$VIRTUAL_ENV/pip.conf`

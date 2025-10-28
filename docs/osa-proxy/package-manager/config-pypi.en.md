---
hide:
  - footer
---

# PyPI Configuration

## Repository URL migration
**Use Case:** Migrating a PyPI repository from Artifactory to OSA Proxy.

The following table provides a summary of repository URL redirection for PyPI. Authentication parameters and other configurations, such as username and password, remain unchanged.

| Source              | pip.conf / pip.ini URL Before migration                         | pip.conf / pip.ini URL After migration  | `application.yml` pypi.repository.registry               |
|---------------------|-----------------------------------------------------------------|-----------------------------------------|----------------------------------------------------------|
| Nexus               | `https://nexus.host.ru/repository/pip-remote`                   | `https://cs-proxy.ru/nexus-pypi/simple` | `https://nexus.host.ru/repository/pip-remote`            |
| Artifactory         | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote/simple` | `https://cs-proxy.ru/jfrog-pypi/simple` | `https://jfrog.host.ru/artifactory/api/pypi/pypi-remote` |
| Official Repository | `https://pypi.org/simple`                                       | `https://cs-proxy.ru/inet-pypi/simple`  | `https://pypi.org`                                       |

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

The following repository definition needs to be added to the service's YAML configuration (the application.yml file) under the pypi section. A service restart is required to apply the changes.

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
index-url = https://cs-proxy.ru/jfrog-pypi
trusted-host = cs-proxy.ru

[install]
trusted-host = cs-proxy.ru
```

Or with authentication:

```ini
[global]
index-url = https://username:password@cs-proxy.ru/jfrog-pypi
trusted-host = cs-proxy.ru

[install]
trusted-host = cs-proxy.ru
```

### Configuration file locations

- **Linux/macOS**: `~/.config/pip/pip.conf` or `~/.pip/pip.conf`
- **Windows**: `%APPDATA%\pip\pip.ini` or `%HOME%\pip\pip.ini`
- **Per-virtualenv**: `$VIRTUAL_ENV/pip.conf`

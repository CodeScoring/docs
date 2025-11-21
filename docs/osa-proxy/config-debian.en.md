---
hide:
  - footer
---

# Debian Package Configuration

## Repository URL Migration

**Use case:** Migration of Debian repositories from direct sources to an OSA Proxy server.

The following table summarizes the redirection of repository URLs for Debian. Please note that the format of the `deb` or `deb-src` repository lines (distribution, components) remains unchanged; only the base repository URL changes.

| Source          | URL in `sources.list` before migration             | URL in `sources.list` after migration  | `application.yml` apt.repository.registry          |
|-----------------|----------------------------------------------------|----------------------------------------|----------------------------------------------------|
| Nexus           | `https://nexus.host.ru/repository/debian-group`    | `https://{osa-proxy-url}/nexus-debian` | `https://nexus.host.ru/repository/debian-group`    |
| Artifactory     | `https://jfrog.host.ru/artifactory/debian-virtual` | `https://{osa-proxy-url}/jfrog-debian` | `https://jfrog.host.ru/artifactory/debian-virtual` |
| Official Debian | `https://deb.debian.org/debian/`                   | `https://{osa-proxy-url}/inet-debian`  | `http://deb.debian.org/debian/`                    |

## APT Repository Migration

**Original file `/etc/apt/sources.list` or `/etc/apt/sources.list.d/*.list`:**

```shell
Types: deb
URIs: https://deb.debian.org/debian
Suites: noble noble-updates noble-backports
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) in the debian section. The service must be restarted for the changes to take effect.

**Configuration in `application.yml` file**

```yaml
apt:
  enabled: true
  repository:
    - name: debian-apt
      scan-package: true
      registry: http://deb.debian.org/debian/
```

After configuring the proxy server and adding it to `application.yml`, your `sources.list` will look like this:

```shell
Types: deb
URIs: https://{osa-proxy-url}/codescoring-debian
Suites: noble noble-updates noble-backports
Components: main universe restricted multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```
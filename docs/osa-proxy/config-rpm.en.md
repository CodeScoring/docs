---
hide:
  - footer
---

# RPM Package Configuration

## Repository URL Migration

**Use case:** Migration of RPM repositories (YUM/DNF) from direct sources to an OSA Proxy server.

The following table summarizes the redirection of repository URLs for RPM.

| Source          | `baseurl` in `.repo` before migration              | `baseurl` in `.repo` after migration   | `application.yml` rpm.repository.registry          |
|-----------------|----------------------------------------------------|----------------------------------------|----------------------------------------------------|
| Nexus           | `https://nexus.host.ru/repository/rpm-proxy`       | `https://{osa-proxy-url}/nexus-rpm`    | `https://nexus.host.ru/repository/rpm-proxy`       |
| Artifactory     | `https://jfrog.host.ru/artifactory/rpm-remote`     | `https://{osa-proxy-url}/jfrog-rpm`    | `https://jfrog.host.ru/artifactory/rpm-remote`     |
| Official Mirror | `https://repo.almalinux.org/almalinux`             | `https://{osa-proxy-url}/inet-rpm`     | `https://repo.almalinux.org/almalinux`             |

## YUM/DNF Repository Migration

**Original file `/etc/yum.repos.d/almalinux.repo`:**

```ini
[baseos]
name=AlmaLinux $releasever - BaseOS
baseurl=https://repo.almalinux.org/almalinux/$releasever/BaseOS/$basearch/os/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux-9
```

The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) in the rpm section. The service must be restarted for the changes to take effect.

**Configuration in `application.yml` file**

```yaml
rpm:
  enabled: true
  repository:
    - name: codescoring-rpm
      scan-package: true
      registry: https://repo.almalinux.org/almalinux
```

After configuring the proxy server and adding it to `application.yml`, the repository configuration will look like this:

```ini
[baseos]
name=AlmaLinux $releasever - BaseOS
baseurl=https://{osa-proxy-url}/codescoring-rpm/$releasever/BaseOS/$basearch/os/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-AlmaLinux-9
```

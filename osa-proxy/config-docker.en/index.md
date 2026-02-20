- [Русский](https://docs.codescoring.ru/osa-proxy/config-docker/index.md)

# Docker Registry Configuration

## Registry URL Migration

**Use case:** Migration of Docker registries from direct sources to an OSA Proxy server.

The following table summarizes the redirection of URLs for Docker.

| Source      | URL before migration          | URL after migration                  | `application.yml` docker.repository.registry |
| ----------- | ----------------------------- | ------------------------------------ | -------------------------------------------- |
| Nexus       | `nexus.host.ru:5000`          | `{osa-proxy-url}/nexus-docker`       | `https://nexus.host.ru:5000`                 |
| Artifactory | `jfrog.host.ru/docker-remote` | `{osa-proxy-url}/jfrog-docker`       | `https://jfrog.host.ru/docker-remote`        |
| Docker Hub  | `registry.hub.docker.com`     | `{osa-proxy-url}/codescoring-docker` | `https://registry-1.docker.io`               |

## Docker Client Migration

The following repository definition needs to be added to the service's YAML configuration (the `application.yml` file) in the docker section. The service must be restarted for the changes to take effect.

**Configuration in `application.yml` file**

```
docker:
  enabled: true
  repository:
    - name: codescoring-docker
      scan-package: true
      registry: https://registry-1.docker.io
      auth-token-url: https://auth.docker.io
      registry: https://jfrog.host.ru/docker-remote
```

After configuring the proxy server and adding it to `application.yml`, the command to pull an image will look like this:

```
docker pull {osa-proxy-url}/codescoring-docker/library/alpine:latest
```

## Using subdomains for access

If you want to use more than one Docker repository, you need to enable subdomains. The subdomain names must match the repository names specified in the `docker.repository` configuration.

In this case, the command to pull an image will look like this:

```
docker pull codescoring-docker.osaproxyhost.ru/library/postgres
```

For a single repository, there is no need to add a subdomain — Docker will be available directly via the OSA Proxy host:

```
docker pull osaproxyhost.ru/library/postgres
```

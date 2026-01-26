---
hide:
  - footer
---

# Connecting registry with container images

## Supported Registries

CodeScoring supports integration with image registries in the following tools:

- Sonatype Nexus Repository;
- JFrog Artifactory;
- GitLab;
- Harbor;
- GitFlic;
- Others that use the Registry V2 API protocol.

## Image Loading Mechanism

CodeScoring loads the information about container images from registries the following way:

1. Lists all container image names;
2. For each container image name, lists tags;
3. For each container image name and tag, requests a manifest;
4. Parses the architecture and the sha256 digest of an image from a manifest;
5. Saves the information about container images currently present in the registry.

**Note**: CodeScoring identifies a combination of the following as a distinct image:

- Container registry;
- Image name;
- Image sha256 digest.

## Configuring an Integration

To work with Container Images, it is necessary to connect registry with images in `System -> Registries` section.

Go to the form of creating a new connection using the **Setup new** button. The following fields should be filled in the
form:

- **Name** - name of the registry;
- **Type** - type of registry implementation (Sonatype Nexus Repository, JFrog Artifactory, JFrog Artifactory Repository Path or other);
- **Is active** - the sign of the active registry. For inactive registries the list of available images will not be
  updated;
- **Auth type** – authorization scheme (Basic, Bearer or Auto);
- **URL** - the address of the registry with the protocol. For example: `https://jfrog.example.com`;
- **Max concurrent connections** - the maximum number of connections concurrently made to the registry during the process of image
  loading;
- **Max keepalive connections** - the maximum number of connections that are kept alive for future reuse during the
  process of image loading;
- **Keepalive expiry, seconds** - the maximum time a keepalive connection can exist before expiring;
- **Page size** - the number of records to request during paginated listing of registry instances;
- **Connect timeout, seconds** - for how many seconds to wait before failing while establishing a connection;
- **Pool timeout, seconds** - for how many seconds to wait before failing while waiting for a connection from the
  connection pool. This often happens when the RPS or the maximum number of concurrent connections is significantly
  limited, therefore, in these cases, the configuration value must high;
- **Read timeout, seconds** - for how many seconds to wait before failing while reading from a connection;
- **Write timeout, seconds** - for how many seconds to wait before failing while writing to a connection;
- **Max RPS** - maximum number of requests per second the system will make to a registry during image loading process;
- **Skip TLS Verification?** - whether to disable certificate validation for TLS/SSL connections;
- **Username** - username with access to the registry;
- **Password** - password;
- **Load full images list?** - whether to periodically load information about images present in the registry;
- **Repositories to load** - select repositories to load container images from, available for JFrog Artifactory Repository Path.

**Important notes about GitLab Container Registry implementation**:

- When setting up an integration with a GitLab Container Registry, you must select the authorization type **Bearer**;
- According to
  the [GitLab Documentation](https://docs.gitlab.com/api/container_registry/#listing-all-container-repositories), in
  order to list all container image names in `/v2/_catalog/`, administrator credentials are required.

You can test the connection after filling in the data by pressing the **Test it** button.

## Viewing Container Registries

After creating a new connection by the **Setup now** button, the registry will be displayed in the section list, with
the possibility to view information about it (**View**), change connection parameters (**Edit**), or delete the
connection (**Delete**).

To update the list of available images, click **Update images list** on the view page. You can check the connection by
clicking the **Refresh status** button.

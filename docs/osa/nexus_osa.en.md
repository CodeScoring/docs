---
hide:
  - footer
---
# CodeScoring Nexus OSA

## Installing the plugin

The **CodeScoring Nexus OSA** plugin comes as a JAR file and supports Sonatype Nexus Repository Manager (NXRM) versions **3.39.0-01** and higher.

To add a plugin to **NXRM** you must:

1. Copy the `nexus-codescoring-plugin.jar` file received from the vendor to the `/opt/sonatype/nexus/deploy` directory:
```bash
cp nexus-codescoring-plugin.jar /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```
If **NXRM** is running in a Docker container:
```bash
docker cp nexus-codescoring-plugin.jar nexus:/opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```
2. Grant rights for the user and group `nexus`:
```bash
chown nexus:nexus /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```
If **NXRM** is running in a Docker container:
```bash
docker exec -it -u 0 nexus chown nexus:nexus /opt/sonatype/nexus/deploy/nexus-codescoring-plugin.jar
```

After the completed operations, you need to restart NXRM.

## Plugin setup

To use the **CodeScoring OSA** plugin in further work, you must use the **Capability** mechanism provided by **NXRM**. **Capability** is a set of APIs and UI components for embedding into **NXRM**, allowing you to expand its functionality.

The **CodeScoring OSA** plugin provides four new **Capabilities**:

- **CodeScoring Configuration** — setting up interaction with the on-premise installation of **CodeScoring**;
- **CodeScoring Scan** — setting up scanning for a separately selected proxy repository;
- **CodeScoring Docker Repository Scan** – setting up scanning for a separately selected hosted or proxy docker repository;
- **CodeScoring All Repositories Scan** – scan settings for all repositories.

After installing the **CodeScoring OSA** plugin in the `System -> Capabilities` section, it will be possible to create **Capability** through the (`+ Create capability`) interface element.

![CodeScoring capability creation example](/assets/img/osa/capability_create_example.png)

### CodeScoring Configuration

This extension allows you to set general plugin settings for working with the **on-premise** version of **CodeScoring**:

- **CodeScoring Token** – key for authorizing API calls (*Created from CodeScoring section `Profile -> Home`*);
- **CodeScoring URL** – address of the on-premise installation of **CodeScoring**;
- **HttpClient Connection Pool Size** – number of available connections. This parameter allows you to control the number of parallel requests to speed up scanning;
- **HTTP Proxy Host** – proxy server address. Used if it is not possible to establish a direct connection between NXRM and CodeScoring;
- **HTTP Proxy Port** – proxy server port;
- **Store artifact analysis in the DB to retrieve them via REST** – saving the artifact scan results in the NXRM database with the ability to retrieve them from the Nexus API;
- **Block downloads in case of plugin or CodeScoring errors** – blocking the download of a component if there are errors from the plugin or CodeScoring API.
- **Custom message for blocked packages** – message for the user when components are blocked;
- **Nexus URL for identification in CodeScoring** – address of the Nexus Repository Manager with the protocol for displaying the results on the installation.

![CodeScoring capability config settings example](/assets/img/osa/capability_config_settings_example.png)

**Attention**: the specified settings will be used by all instances that check proxy repositories.

### CodeScoring Proxy Repository Scan

This extension allows you to enable component checking for the selected proxy repository with the following parameters:

- **Repository** – select the repository for which the escaping function will be applied;
- **Security violation response status** – error code returned when security policies are triggered;
- **Delete blocked by policy component from repository** – forced removal of blocked components from the repository (*creating a “sterile” repository*);
- **Select capability work mode** – plugin operating mode.

![CodeScoring capability scan settings example](/assets/img/osa/capability_scan_settings_example.png)

### CodeScoring Docker Repository Scan

This extension allows you to enable component check for the selected hosted or proxy docker repository with the following parameters:

- **Repository** – select the repository for which the escaping function will be applied;
- **Security violation response status** – error code returned when security policies are triggered;
- **This user skips container image scan** – user for which image scanning is not applied. Used when loading and checking components by the console agent;
- **Host and port used for CodeScoring to download container image to scan** – address (without specifying the protocol) and port through which images for scanning will be downloaded. Used to communicate between Nexus and repository via Docker;
- **Block not scanned images** – block the downloading of images that have not been scanned;
- **Select capability work mode** – plugin operating mode. The operating modes are described in the section below;
- **Append repository name to image name for Docker repositories** – adding the repository name to the URL (for example: `nexus.domain.com` -> `nexus.domain.com/repoName`).

![CodeScoring capability docker repository example](/assets/img/osa/capability_docker_settings_example.png)

### CodeScoring All Repositories Scan

The extension allows you to enable component checking for all repositories within the Sonatype Nexus Repository Manager with the following parameters:

- **List of comma separated repositories to ignore** – list of repositories that will not be scanned;
- **Security violation response status** – error code returned when security policies are triggered;
- **This user skips container image scan** – user for which image scanning is not applied. Used when downloading and checking components by the console agent;
- **Host and port used for CodeScoring to download container image to scan** – address (without specifying the protocol) and port through which images for scanning will be downloaded. Used to communicate between Nexus and repository via Docker;
- **Select capability work mode** – plugin operating mode. The operating modes are described in the section below;
- **Append repository name to image name for Docker repositories** – adding the repository name to the URL (for example: `nexus.domain.com` -> `nexus.domain.com/repoName`).

![CodeScoring capability all repositories scan](/assets/img/osa/capability_all_repositories_settings_example.png)

### Setting the plugin operating mode

The operating mode of the plugin must be defined as a text string in the corresponding field of the Capability **CodeScoring Proxy Repository Scan** and Capability **CodeScoring Docker Repository Scan** settings.

The plugin has 5 operating modes that determine the severity of component checking before loading.

- **warmup** – loading data into the CodeScoring cache without blocking components;
- **spectator** – loading data into the CodeScoring cache without blocking components, saving the results of component queries on the installation;
- **moderate** – blocking components that have not passed the policy check. Loading of unscanned components is allowed;
- **strict** – blocking components that do not pass the policy check. Loading of unscanned components is prohibited;
- **strict_wait** – blocking components that have not passed the policy check. Pending verification for unscanned components.

### Setting up logging

To configure logging of plugin events, you need to go to the `Support -> Logging` section and add a logger with the name **ru.codescoring** and logging level **DEBUG**.

![NXRM logs](/assets/img/osa/nxrm_logs.png)

Event logging results are available in the `Support -> Logs` section.

### Saving and retrieving artifact scan results

When the **Store artifact analysis in the DB to retrieve them via REST** flag is activated in the plugin configuration, the results of scanning artifacts will be saved to the Nexus database. This allows you to obtain information about which components were requested by users and what the download status of these components was.

You can retrieve scan results via the Nexus REST API using the `v1/analysis` endpoint with three optional parameters:

- **userName** – user name in Nexus;
- **date** – scan date in YYYY-MM-DD format;
- **repositoryName** – name of the repository in Nexus.

Example request using `curl`:

```bash
curl -X GET https://test.nexus.com/service/rest/v1/analysis?userName=example_user&date=2023-10-19&repositoryName=example_repository
```

Example response with scan result:
```bash
[
 {
 "userName": "bobby",
 "artifactName": "specs",
 "artifactVersion": "4.8",
 "repositoryName": "gems",
 "downloadState": "LOADED",
 "scanDate": "2023-08-12",
 "scanTime": "10:17:59"
 },
 {
 "userName": "bobby",
 "artifactName": "kmod",
 "artifactVersion": "27-1ubuntu2",
 "repositoryName": "ubuntu",
 "downloadState": "LOADED",
 "scanDate": "2023-08-12",
 "scanTime": "11:52:53"
 },
]
```

## Blocking components

When a component is blocked from downloading, the user console displays one of the following reasons for blocking:

- **"The download has been blocked in accordance with the policies configured in CodeScoring"** – blocking of the component according to the policies configured on the installation;
- **"The component has not yet been scanned by CodeScoring, it is scheduled to be scanned shortly. The download is blocked according to the plugin settings"** – blocking an unscanned component and then starting scanning. Used in `strict` mode;
- **"The download has been blocked due to the failure of the scan of the component in CodeScoring"** – the component could not be scanned;
- **"The download has been blocked due to the wrong mode of the plugin"** – incorrect [plugin operating mode] is used(#_3);
- **"The download has been blocked due to the timeout of the scan of the component in CodeScoring"** – the timeout for scanning the component has expired. Used in `strict_wait` mode;
- **"The download has been blocked, because registry is not configured in CodeScoring"** – there is no corresponding Registry on the installation.

The response also contains a link to the component page in CodeScoring with information about triggered security policies and found vulnerabilities:

![Component page](/assets/img/osa/component-page.png)
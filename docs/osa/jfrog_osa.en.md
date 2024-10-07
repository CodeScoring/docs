---
hide:
  - footer
---
# CodeScoring JFrog OSA

## Installing the plugin

The **CodeScoring JFrog OSA** plugin supports JFrog Artifactory Pro versions **7.43** and higher.

The plugin comes as an archive with the following structure:

```
.
├── CHANGELOG.md
├── codescoring.groovy
├── codescoring.yaml
└── lib
 └── codescoring-plugin-jfrog.jar
```

To add a plugin to **JFrog** you need to:

1. Unpack the resulting archive into the `$JFROG_HOME/artifactory/var/etc/artifactory/plugins` directory.
2. Create a file to configure `codescoring.yaml` in the directory. An example of the content is in the supplied archive.
3. Make a request to **API JFrog Pro** to load the plugin `POST /api/plugins/reload`:
```curl
curl -X POST https://[JFROG_URL]/api/plugins/reload
```

## Checking the plugin installation

To check the installation of the plugin in the system, you need to check the service logs. Upon successful download and initialization, the following message will appear in the logs:

```
2023-08-08T09:41:35.105Z [jfrt ] [INFO ] [70be801ff583b741] [r.c.p.codescoring:16 ] [art-init ] - CodeScoring: Initialization of CodeScoringPlugin completed
```

## Plugin update

If you update an archive with a plugin, you must use the following API command for the updates to take effect:

```curl
curl -X POST https://[JFROG_URL]/api/plugins/reload
```

In case of updating the plugin configuration in the `codescoring.yaml` file, you must use the following API command:

```curl
curl -X POST https://[JFROG_URL]/api/plugins/execute/codeScoringReload
```

## Plugin setup

To configure the plugin, use the `codescoring.yaml` file.

Example of file content:

```
# true/false
disablePlugin: false

codeScoringAPI:
  # The base URL for all CodeScoring API endpoints.
  # Required.
  # Example: https://host:port or https://host
  url:

  # Your CodeScoring API Token for authentication.
  # Required.
  token:

  # Http client connection pool size to CodeScoring BE service.
  # By default, value is 200 since it correlates with the default artifactory thread pool size for tomcat.
  # If you tuned your instance of the artifactory https://jfrog.com/help/r/how-do-i-tune-artifactory-for-heavy-loads
  # you should scale this value for better performance maximum up to tomcat.connector.maxThreads value.
  connectionPoolSize: 200

  # By default, if CodeScoring API hasn't responded within a duration of 60 seconds, the request will be cancelled.
  # This property lets you customize the timeout duration in seconds.
  timeout: 60

  # If you are using a proxy, you must provide both Hostname/IP and port.
  proxy:
    host:
    port:

# Artifactory's response status code for blocked packages.
blockedBuildResponseCode: 403

# If set to 'false' allows artifact downloads regardless of errors from CodeScoringAPI or plugin
blockOnErrors: true

# If set to 'true', the plugin will scan all supported repositories
# except specified in the "excludeRepositories" section.
scanAllRepositories: false

# Store scan date and blocking reasons in the artifact properties.
storeScanProperties: false

# Default settings for all repositories. Can be overridden by repositories.repo-name settings
defaults:
  dockerRegistryUrl: jfrog.my.domain

  # warmup |  Scan cache warmup without requests monitoring, no blocking
  # spectator | Scan cache warmup with requests monitoring, no blocking
  # moderate | Policy-based blocking using cache results, not scanned component downloads allowed
  # strict | Policy-based blocking using cache results, not scanned component downloads blocked
  # strict_wait | Policy-based blocking, wait until component is scanned
  # default value is strict_wait if not specified in default or repository settings or in case of a typo
  workMode: strict_wait

  # Allows this user to skip scan
  skipScanUser: codescoring

  # Set to 'true' if you use Docker Access Method 'Sub domain' (repo-name.jfrog.my.domain) or 'Port' (jfrog.my.domain:25000)
  stripRepoNameInDockerImageName: false

  # Artifactory url for CodeScoring to apply policies.
  # Value MUST BE equal to Repository Manager URL in CodeScoring
  # Example: https://jfrog.my.domain
  repositoryManagerUrl:

  # Delete artifact from the repository if it is blocked by the policies
  deleteBlocked: false

# Settings per repository
# Example:
# repositories:
#   docker-remote:
#   docker-local:
#     dockerRegistryUrl: another-jfrog.my.domain
#     skipScanUser: codescoring
#     workMode: spectator
#   pypi-remote:
#     workMode: warmup
repositories:

# List of the excluded repositories. Used, if scanAllRepositories=true
# Example:
# excludeRepositories:
#   - npm-remote
#   - maven-local
excludeRepositories:

# List of repository types to scan. Used, if scanAllRepositories=true
# Supported values are: maven, npm, pypi, nuget, cocoapods, go, gems, debian, yum, alpine, docker, composer, cargo
# Example:
# repositoryTypes:
#   - npm
#   - go
repositoryTypes:
```

### Parameter description

- **disablePlugin** – disable the plugin;
- **codeScoringAPI** - settings for the interaction of the plugin with the CodeScoring installation;
 - **url** – CodeScoring installation address (protocol must be specified);
 - **token** – key for authorizing API calls (*Created from CodeScoring section `Profile -> Home`*);
 - **connectionPoolSize** – size of the connection pool with the CodeScoring installation;
 - **timeout** - response waiting time (in milliseconds). By default, if the CodeScoring API does not respond within 60 seconds, the request will be canceled;
 - **proxy** - proxy server settings;
 - **host** - host/IP;
 - **port** - port;
- **blockedBuildResponseCode** – error code returned when security policies are triggered;
- **blockOnErrors** - blocking the loading of components in case of an error when interacting with the CodeScoring installation;
- **scanAllRepositories** - connection of all supported repositories except those specified in the **excludeRepositories** parameter;
- **storeScanProperties** - saving the blocking reason and scan time stamp to the artifact properties;
- **defaults** – default scanning settings for all connected repositories;
 - **dockerRegistryUrl** – Docker registry address;
 - **workMode** – plugin operating mode. The conditions of each operating mode are described in the section below;
 - **skipScanUser** – user for whom component scanning is skipped. Necessary so that CodeScoring can independently pick up the component for scanning;
 - **stripRepoNameInDockerImageName** – remove the repository name from the image name. Used in the Repository Path approach when working with docker registry. By default, the repository name is appended to the image name;
 - **repositoryManagerUrl** - Artifactory URL. The same URL must be specified in CodeScoring to apply policies across repositories.
 - **deleteBlocked** - delete an artifact blocked by policies;
- **repositories** – list of repositories for which component scanning is operating. For each repository, you can specify parameters separately, as in the **defaults** parameter;
- **excludeRepositories** - list of repository names excluded from processing by the plugin.

**Important**: for generic and VCS repositories, be sure to specify one of the following repository types in the [Internal Description](https://www.jfrog.com/confluence/display/JFROG/Repository+Management):

- maven
-npm
- pypi
- nuget
- cocoapods
- go
- gems

### Setting up operating modes

The plugin's operating mode is determined by the **workMode** variable in the `codescoring.yaml` file.

The plugin has 6 operating modes that determine the severity of checking components before loading.

- **off** – component scanning is disabled;
- **warmup** – loading data into the CodeScoring cache without blocking components;
- **spectator** – loading data into the CodeScoring cache without blocking components, saving the results of component queries on the installation;
- **moderate** – blocking components that have not passed the policy check. Loading of unscanned components is allowed;
- **strict** – blocking components that do not pass the policy check. Loading of unscanned components is prohibited;
- **strict_wait** – blocking components that have not passed the policy check. Pending verification for unscanned components.

**Important**: the selected operating mode will affect **all** repositories specified in the `repositories` variable.

### Setting up logging

The file with logging settings is located at `$JFROG_HOME/artifactory/var/etc/artifactory/logback.xml`.

To configure plugin event logging, you need to add the following content to the `logback.xml` file:

```
<appender name="FILE_CODESCORING" class="ch.qos.logback.core.rolling.RollingFileAppender">
 <File>${log.dir}/codescoring.log</File>
 <rollingPolicy class="org.jfrog.common.logging.logback.rolling.FixedWindowWithDateRollingPolicy">
 <FileNamePattern>${log.dir.archived}/codescoring.%i.log.gz</FileNamePattern>
 </rollingPolicy>
 <triggeringPolicy class="org.jfrog.common.logging.logback.triggering.SizeAndIntervalTriggeringPolicy">
 <MaxFileSize>25MB</MaxFileSize>
 </triggeringPolicy>
 <encoder>
 <charset>UTF-8</charset>
 <pattern>%date{yyyy-MM-dd'T'HH:mm:ss.SSS, UTC+3}Z [%-5p] [%-16X{uber-trace-id}] [%-30.30(% c{3}:%L)] [%-20.20thread] - %m%n</pattern>
 </encoder>
</appender>
<logger name="en.codescoring" additivity="false">
 <level value="debug" />
 <appender-ref ref="FILE_CODESCORING" />
</logger>
```

## Blocking components

When a component is blocked from downloading, the user console displays one of the following reasons for blocking:

- **"The download has been blocked in accordance with the policies configured in CodeScoring"** – blocking of the component according to the policies configured on the installation;
- **"The component has not yet been scanned by CodeScoring, it is scheduled to be scanned shortly. The download is blocked according to the plugin settings"** – blocking an unscanned component and then starting scanning. Used in `strict` mode;
- **"The download has been blocked due to the failure of the scan of the component in CodeScoring"** – the component could not be scanned;
- **"The download has been blocked due to the wrong mode of the plugin"** – incorrect [plugin operating mode](#_3) is used;
- **"The download has been blocked due to the timeout of the scan of the component in CodeScoring"** – the timeout for scanning the component has expired. Used in `strict_wait` mode;
- **"The download has been blocked, because registry is not configured in CodeScoring"** – there is no corresponding Registry on the installation.

The response also contains a link to the component page in CodeScoring with information about triggered security policies and found vulnerabilities:

![Component page](/assets/img/osa/component-page.png)
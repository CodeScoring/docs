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
 # Required field. https://host:port
 url: https://example.com:443

 # Your CodeScoring API Token for authentication.
 #Required.
 token: 0d496e5e7153d98fd346d7498cdf2dc61a669077

 # Http client connection pool size to CodeScoring BE service.
 # By default, value is 200 since it correlates with the default artifactory thread pool size for tomcat.
 # If you tuned yours instance of the artifactory https://jfrog.com/help/r/how-do-i-tune-artifactory-for-heavy-loads
 # you should scale this value for better performance maximum up to tomcat.connector.maxThreads value.
 connectionPoolSize: 200

 # By default, if CodeScoring API hasn't responded within a duration of 60 seconds, the request will be cancelled.
 # This property lets you customize the timeout duration in seconds.
 timeout: 60

 # If you are using a proxy, you must provide both Hostname/IP and port.
 proxy:
 host: 192.168.1.100
 port: 8080

# Artifactory's response status code for blocked packages.
blockedBuildResponseCode: 403

# If set to 'false' allows artifact downloads regardless of errors from CodeScoringAPI or plugin
blockOnErrors: true

# Default settings for all repositories. Can be overridden by repositories.repo-name: settings
defaults:
 dockerRegistryUrl: jfrog.my.domain

 #warmup | Scan cache warmup without requests monitoring, no blocking
 # spectator | Scan cache warmup with requests monitoring, no blocking
 #moderate | Policy-based blocking using cache results, not scanned component downloads allowed
 # strict | Policy-based blocking using cache results, not scanned component downloads blocked
 # strict_wait | Policy-based blocking, wait until component is scanned
 # default value is strict_wait if not specified in default or repository settings or in case of a typo
 workMode: strict_wait

 # Allows this user to skip scan
 skipScanUser: codescoring

 # Set to 'true' if you use Docker Access Method 'Sub domain' or 'Port'(ex: docker-local.company-jfrog.com, company-jfrog.com:25000 ).
 # Default: false
 stripRepoNameInDockerImageName: false

# Settings per repository, you must specify repository name for it to be scanned by plugin.
repositories:
 docker-remote:
 docker-local:
 dockerRegistryUrl: another-jfrog.my.domain
 skipScanUser: codescoring
 workMode: spectator
 pypi-remote:
 workMode: warmup
```

### Parameter meaning

- **disablePlugin** – disable the plugin;
- **url** – address of the **CodeScoring** installation (protocol must be specified);
- **token** – key for authorizing API calls (*Created from CodeScoring section `Profile -> Home`*);
- **connectionPoolSize** – size of the connection pool with CodeScoring;
- **timeout** - response waiting time (in milliseconds). By default, if the CodeScoring API does not respond within 60 seconds, the request will be canceled.
- **host** - IP (if using a proxy server);
- **port** - port (in case of using a proxy server);
- **blockedBuildResponseCode** – error code returned when security policies are triggered;
- **blockOnErrors** - blocking of components. If set to `false`, components will be loaded regardless of the presence of CodeScoring API or plugin errors;
- **defaults** – default scanning settings for all specified repositories;
- **dockerRegistryUrl** – address of the repository with container images;
- **workMode** – plugin operating mode. The conditions for each operating mode are described in the section below.
- **skipScanUser** – user for whom component scanning is skipped;
- **stripRepoNameInDockerImageName** – presence of the repository name in the image name. Default value is `false`;
- **repositories** – list of names of repositories for which component scanning works. For each repository, you can separately specify the dockerRegistryUrl, skipScanUser and workMode variables.

**Important**: for generic and VCS repositories, be sure to specify one of the following repository types in the [Internal Description](https://www.jfrog.com/confluence/display/JFROG/Repository+Management):

- maven
-npm
- pypi
- nuget
- cocoapods
- go
- gems

### Setting up operating modes

The plugin's operating mode is determined by the **workMode** variable in the `codescoring.properties` file.

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
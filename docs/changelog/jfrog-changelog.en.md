---
hide:
 -footer
---
# JFrog OSA Changelog

### [2025.11.0] - 2024-03-13

- A Circuit Breaker mechanism has been added to the plugin to prevent Artifactory performance degradation in case of unavailability or timeouts from the on-premise installation

### [2024.49.0] - 2024-12-05

- Added new execution `codeScoringVersion`, allowing to find out the plugin version. To do this, run the command:
`curl http://localhost:8082/artifactory/api/plugins/execute/codeScoringVersion`. If the version is not displayed, restart JFrog.

### [2024.48.0] - 2024-11-29

- Added sending to CodeScoring a link to the artifact and the user downloading it. Compatible with installation version 2024.48.0 and higher
- Added support for JFrog Artifactory v7.90+
- For `deb` packages, improved information retrieval in case of using non-standard separators in the file name
- Visually highlighted plugin initialization and config reload in the logs

### [2024.42.0] - 2024-10-16

- Packages that do not contain a version are no longer sent for analysis to CodeScoring and will be skipped by the plugin
- Fixed parsing of `deb` versions for alternative separators in the format `package-version-architecture.type`

### [2024.39.0] - 2024-09-26

- Added a setting to scan the selected repository type `repositoryTypes` (maven, npm, etc)
- Fixed crash in Artifactory 7.49

### [2024.33.0] - 2024-08-12

- Added support for `cargo` and `composer` repositories
- Added a flag for saving scan results to artifact properties

### [2024.28.0] - 2024-07-10

- Added scanning of archives in `.gem` format for Ruby repositories

### [2024.26.0] - 2024-06-28

- Added the ability to connect the plugin to all supported repositories without having to list them (`scanAllRepositories`)
- Added the ability to exclude repositories from the list of connected ones using the `scanAllRepositories` option
- Added `deleteBlocked` flag to delete a component if it is blocked by policies
- Added setting of component properties: scan date, blocking reason, link to the package page
- Detailed description of the configuration file
- Improved logging when skipping a scan
- The `blockOnErrors` flag now takes into account scan failure (status `blocked_scan_failed`)

### [2024.11.0] – 2024-03-15

- Added a link to the component page in CodeScoring in the blocking message
- Added a new message about component blocking in situations where registry is not added to CodeScoring
- Added setting for working with Docker registry Repository path (`stripRepoNameInDockerImageName`)
- Improved artifact name and version detection for PyPI, NPM, Debian and Alpine repositories
- Fixed scanning error for uncached images in remote docker repositories

### [2024.5.0] – 2024-02-02

- Added processing of zip archives in golang repositories
- Improved work with debian packages
- Fixed error checking alpine packages
- Fixed scanning of artifacts in virtual repositories

### [2024.2.0] – 2024-01-12

- The list of image architectures has been expanded
- Added support for new component blocking statuses
- Added logging of the request body for loading a component and the response
- Fixed bug blocking packages in debug mode

### [2023.50.0] – 2023-12-15

- Added new operating mode `spectator`
- Added support for scanning multi-platform Docker images
- The plugin configuration file now uses the `.yaml` format
- Added the ability to specify the operating mode for each repository separately
- Added the ability to change default values in the configuration file
- Added HTTP Client Connection Pool Size parameter to control the number of installation requests
- Added option to disable plugin

### [2023.48.0] – 2023-11-23

- Added config output to log when plugin starts

### [2023.43.0] – 2023-10-27

- Added various [plugin operating modes](/osa/jfrog_osa.en/#_5)
- Added support for scanning local/remote Docker repositories

###[2023.28.2]

- Added `CodeScoring:` prefix to all logs

### [2023.28.1]

- Reduced the level of all errors interacting with the CodeScoring installation to `[INFO]`

### [2023.28.0]

- Fixed a bug with the `blockDownloads` flag not working in properties

###[2023.27.0]

- Added the `blockDownloads` flag to properties, which allows you to control the download of a package if there are errors in the CodeScoring API or plugin

### [2023.26.0]

- Fixed saving the properties of a package when downloading it from a virtual repository

### [2023.22.0]

- Fixed a bug with the required `project_name` field in the OSA API

### [2023.21.0]

- The plugin delivery format has been changed: it is now supplied as a jar file
- Changed plugin initialization: instead of reloading for each request, there is a one-time initialization at startup

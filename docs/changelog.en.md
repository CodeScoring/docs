---
hide:
 -footer
---
# Changelog

## Codescoring On-premise

### [2024.29.1] - 2024-07-17

- Added an ability to specify a license for CLI projects when creating via the API
- Fixed an error while displaying Matched Criteria in the Policy Alerts section
- Fixed the color of the warning level on the blocked component page

### [2024.28.0] - 2024-07-09

- Implemented a new mechanism of policy conditions with the formation of logical expressions
- Optimized memory consumption when generating PDF reports
- Searching LDAP user attributes is now case insensitive
- Fixed sorting in the vulnerability table on the Container Image viewing page
- Fixed calculation of block status in OSA for selected components in a policy

### [2024.25.0] - 2024-06-18

- Added setting for matching LDAP group and user access level
- Added the ability to ignore Policy Alerts by PURL
- Added checking the availability of the Container Registry before starting an image scan in the interface
- Added description of OSA API methods in Swagger
- Improved installation stability in older browsers
- Accelerated loading of the `Components -> OSA Packages` section
- Fixed display of graphs and pagination of the commit table on the TQI tab of the project page
- Fixed the request date filter in the `Components -> Packages` section
- Fixed changing of an obsolete token for VCS
- Removed deprecated API method `/api/dashboard/security/top5_vulnerable_projects/`

### [2024.24.0] - 2024-06-11

- Optimized memory usage when loading vulnerability descriptions

### [2024.22.2] - 2024-05-28

- Added the ability to run installation with the readOnlyRootFilesystem option in Kubernetes
- Improved search speed in the Dependencies, Policy Alerts and Components sections
- Improved sorting by the Dependency/Package field in the Policy Alerts section
- Added cleaning of temporary files after forced completion of image scanning
- Fixed missing Distribution by technology graph in CLI projects after the first scan
- Fixed an error in generating a PDF report if there were links in PURL

### [2024.22.1] - 2024-05-27

- Changed the status in OSA plugins when receiving an unknown Repository Manager

### [2024.22.0] - 2024-05-27

- Fixed a bug when displaying the `Settings -> Workmode` section

### [2024.21.0] - 2024-05-24

- Added the ability to connect repository managers through the interface
- Added OSA package filter for repository managers and individual repositories
- Added policy settings for specific repositories
- Improved LDAP group mapping

### [2024.17.2] - 2024-04-27

- Added the package release date to the page in the `Components -> Packages` section
- A hint has been displayed for the Plugin mode column in the `Components -> Requests` section
- Fixed an error in opening the Policy Ignore editing page with a specified Container Image
- Fixed generation of links to commits in Gitlab

### [2024.17.1] – 2024-04-23

- Added the ability to specify the OSA type of the component for which the policy will be applied
- Added Group mapping section for configuring LDAP groups
- Added mapping of LDAP groups to internal CodeScoring groups
- Added links to vulnerabilities and licenses in the Matched criteria field of the Policy Alerts section
- Added search to the policy condition by the Technology field
- Added the Matched criteria field to the Policy Alerts table on the project page
- Returned display of the SBOM loading icon
- The License and Vulnerability columns in the Policy Alerts tables are now hidden by default
- Accelerated loading of the `Components -> Requests` section
- Improved periodic cleaning of OSA queries from the database
- Fixed redirect when deleting a user
- Fixed formation of Dependency Name from PURL

### [2024.15.0] - 2024-04-09

- Added the ability to configure multiple LDAP integrations
- Added Matched criteria output in the Container images section
- Added columns and filters Scan schedule, Scan with hashes to the Projects section
- Added columns and filters Scan schedule, Excluded from analysis to the `Settings -> Projects` section
- Added information about the previous user access level to the Audit Log
- Added support for non-standard ports for SSH when adding VCS
- Added percentage of similarity between authors in the Authors section
- Implemented periodic cleaning of OSA queries in the database
- Returned the `dev` policy stage to the project settings

### [2024.13.0] – 2024-03-27

- Fixed re-running of periodic tasks in the queue
- Fixed long wait for response from Index API in case of connection interruption

### [2024.12.0] – 2024-03-22

- Added Components section, which includes lists of OSA components and requests
- Added the Vulnerabilities field to the CSV project report
- Added pool_used metric to view busy connections from the pool
- Optimized launching analysis and unloading SBoM CLI project
- Fixed ignoring the load full images list flag when creating or updating a Registry
- Fixed display of the number of active policies in the Dashboard section
- Fixed missing options for CVSS2 Authentication policy
- Fixed an error when calculating Policy Alerts of a policy with the CVSS Score condition

### [2024.11.0] – 2024-03-18

- Added information about the package to the Policy alerts and Vulnerabilities sections on the page of the image blocked in OSA
- Added Group filter in the Vulnerabilities section
- Renamed the Blocks build policy attribute to Blocker
- Optimized analysis of CLI projects in situations where the dependencies of the analyzed project are often found in other projects
- Accelerated loading of information about similar authors
- Fixed display of connections at the same level in the project dependency graph

### [2024.10.0] – 2024-03-06

- Fixed the disappearance of the HTML upload button for charts
- Changed the formatting of commit messages in the project commits table
- Fixed display of metrics on project pages for which analysis was not carried out
- Fixed availability of downloading the PDF report and SBOM depending on the status of the project analysis

### [2024.9.1] – 2024-02-29

- Fixed case insensitivity when creating users from LDAP

### [2024.9.0] – 2024-02-28

- Added display of analysis status in history for projects and images
- Added display of commit messages in projects for past periods on the TQI page
- Expanded SCA metrics on the project page
- Fixed behavior when loading and scanning images without tags
- Fixed updating information about Container registry after saving changes
- Fixed inability to view project commits for the last week
- Fixed display of metrics on project pages for which analysis was not carried out
- Fixed integration with LDAP
- Reduced timeout when checking Registry availability

### [2024.8.0] – 2024-02-22

- Fixed launch of general analysis of clones
- Fixed display of paths to files inside clones
- Fixed transitions to lists of clones from the clone map
- Fixed display of the author when there is no email field
- Fixed display of hidden columns in tables
- Fixed display of the `block_status` variable in the list of the Container Images section
- Fixed updating the list of images when there are images in the registry without specifying the platform
- Removed empty value when selecting in filters
- Removed automatic restart of scheduled scanning in case of a crash

### [2024.7.0] – 2024-02-16

- Added vulnerabilities from the FSTEC BDU
- Implemented a page to display information about a component blocked in OSA
- Implemented launch of author analysis for one project
- Implemented the launch of clone analysis for one project
- Added a table of commits on the TQI tab of the project page
- Fixed filter for vulnerabilities in the Policy Alerts section
- Fixed transition to the policy page from the Dashboard section

### [2024.5.0] – 2024-02-02

- Updated system UI
- Added new SCA metrics on the project page
- Added policy condition to match PURL [regular expression](https://docs.python.org/3/library/re.html#regular-expression-syntax)
- Added policy condition for searching a text string in PURL
- Added a check for hidden characters when entering the activation key
- Fixed filter by technology in the Projects section
- Fixed display of technologies for CLI projects in the Projects section
- Optimized policy recalculation mechanism
- Clarified error messages about connecting to GitLab
- Changed the orientation of the Vulnerabilities section in the PDF project report

### [2024.2.0] – 2024-01-12

- Added information about the architecture of scanned images
- Added Group filter on the projects page
- Added support for CycloneDX 1.5 specification when importing SBOM
- Added new blocking statuses for OSA components
- Improved OSA performance
- Accelerated loading of Complexity map in the Projects section
- Removed scans stuck in in progress status
- Fixed report export to PDF when actively scanning a project and for CLI projects

### [2023.49.0] – 2023-12-08

- Added the ability to export a PDF report with the results of scanning a project
- Added support for Rust dependency analysis via Cargo manifests
- Added the ability to clone a repository via SSH
- Added new VCS type "Other Git"
- Added display of the number of vulnerabilities found in the list of the Projects section
- Added search for nested vulnerabilities (those with entries in different feeds) in the Vulnerabilities section
- Added setting for displaying project ID in the `Settings -> Projects` section
- Added null values to Prometheus OSA API metrics
- Automatic analysis after cloning a VCS project has become optional
- Fixed an error when sorting the table by the CVSS3 Attack Complexity field in the Vulnerabilities section
- Fixed incorrect operation of OSA with packages that have uppercase in the version

### [2023.48.0] – 2023-11-22

- Reduced the size of supplied Docker images CodeScoring
- Added the Matched criteria parameter with the reason for the triggered policy to the Policy alerts section
- Added a new type of Container registries "Other"
- Added the right for users with User access level to create CLI projects via the API
- Added Prometheus metrics on scan status and component blocking status in OSA
- Added password and token hiding in Jira connection settings
- Removed duplicate vulnerabilities in SBOM that have different affected versions
- Removed obsolete endpoint API `/integration_api/v1/`
- Analysis work with a large number of Policy ignores has been accelerated
- Fixed UnsafeOption error when working with Azure and Bitbucket
- Fixed display of available values for the Container images filter in the Policy alerts section
- Fixed search by dependency in the Policy alerts section
- Fixed display of the CWE filter in the Vulnerabilities section

### [2023.44.0] – 2023-10-31

- Added saving filters between tabs in the Policy alerts section
- Fixed display of resolved Policy alerts on the project page

### [2023.43.0] - 2023-10-27

- Added support for scanning proxy Docker repositories based on Sonatype Nexus and JFrog Artifactory
- Added Digest and tags on the container image page
- Added background update of vulnerabilities and background operation of policies for components from container images
- Added [metrics of number and time of requests](/on-premise/how-to/metrics.en) for CodeScoring OSA
- The installation queue metrics have been supplemented - now you can separately view the types of analyzes in the queue
- Added a new policy condition – age of vulnerability
- Added the ability not to automatically download the list of images when adding a Container Registry
- Fixed opening the Policy Ignore view page
- Fixed display of git error 128 when working with VCS

### [2023.41.0] - 2023-10-09

- Running CodeScoring no longer requires superuser rights inside the container. Instructions for migrating from root containers to rootless are available from the vendor

### [2023.40.0] - 2023-10-04

- Added the ability to scan images from hosted Docker repositories based on Sonatype Nexus and JFrog Artifactory
- Added the ability to block downloading images from Sonatype Nexus Repository if they do not comply with security policies

### [2023.38.0] - 2023-09-20

- Added the ability to specify special characters in the password for connecting to the database
- Fixed an issue with displaying ignored alerts in the Policy Ignores section
- Fixed display of Source files and Parents fields on the dependency page
- Instant removal of an alert from the Active list after creating an ignore rule has been restored
- Added [update scheme](/on-premise/update.en) to the current version of the product.

### [2023.35.0] - 2023-08-31

- Added history of SCA scans in the project
- On the project page, information for the SCA and TQI modules is now displayed in separate tabs
- Added display of parts of CVSS vectors in the list of vulnerabilities
- Added a new policy condition "Vulnerability has fixed version"
- Added the CWE field to the CSV vulnerability table export
- Added CodeScoring banner and version logging to the console when launching a Docker container with installation
- Added metrics for the number of running analyzes for Prometheus
- Removed deprecated endpoint `/api/policy_alerts/ignored/`
- Removed deprecated endpoint `/api/policy_alerts/resolved/`
- Removed deprecated endpoint `/api/policy_alerts/`
- Fixed display of technologies on the Policy ignores list
- Fixed purl and CVSS policy for rpm
- Removed license text from generated SBoMs for the project

### [2023.31.0] - 2023-08-04

- Speeded up CodeScoring OSA

### [2023.30.0] - 2023-07-27

- Added fixed version in the Affected dependencies table on the vulnerability page
- Added queue status metrics for Prometheus
- Moved the installation version from the footer to the side menu
- Fixed inconsistency between Swagger schema and API
- Removed the ability to click the Upload SBOM button without an attached file

### [2023.26.0] - 2023-06-30

- Added support for system packages for the OSA plugin in NXRM
- Added new policy conditions - on the presence of a vulnerability exploit and parts of the CVSS vector
- Added output of policy name, stage and level to the Policy alerts list on the project page
- Added a filter by project type in the list of projects
- Marked the `/api/dependencies/csv/` method as deprecated. Now you need to use `/api/dependencies/by_project/csv/`
- Fixed an error when adding a project without first creating a VCS
- Fixed display of information about stages on the policy description card for the User access level

### [2023.24.0] - 2023-06-13

- Added a filter for searching by policy name in the Policies section
- Fixed dependency export with an empty filter

### [2023.22.0] - 2023-06-01

- Fixed loading SBOM in CycloneDX format obtained from `Microsoft.SBOMTool`
- Fixed processing of fractional vulnerability ratings when generating SBOM

### [2023.21.3] - 2023-05-30

- Fixed loading SBOM in CycloneDX format obtained using third-party tools
- Improved loading of Code Clones pages

### [2023.21.2] - 2023-05-23

- Added the ability to upload and download SBOM for a project in CycloneDX format
- Added the ability to perform analysis on a CLI project through the interface
- Added manual update of project code in settings
- Added the ability to connect several VCS with the same address, but different tokens
- Added basic auth support for integration with Jira
- Fixed display of the list of licenses on the chart
- Fixed the appearance of duplicate alerts under heavy load

### [2023.15.0] - 2023-04-14

- Added a new type of projects without reference to a repository - CLI
- Added Policy alerts grouping to digests for notifications via email
- Added search by policy name and dependency name in Policy alerts
- Added recommendations for eliminating vulnerabilities (fixed version)
- Added support for parsing packages in deb/apk/rpm formats
- Added a prompt to refresh the page if the client version is different from the server version
- Added minor improvements to the UI

### [2023.11.0] - 2023-03-16

- Fixed long loading of the Distribution by license graph on the Dashboard
- Added Note field to Policy ignore
- Added Description field to Policy
- Added a new Auditor access level
- Added session lifetime setting via environment variable
- Added links to the dependency graph

### [2023.6.0] - 2023-02-10

- Added project dependency graphs (link is on the project page)
- Added option to disable hash collection during SCA on installation
- Added Index API response cache for OSA (by default from 1 hour to 1.5 hours, configured through environment variables)
- Added information about restrictions on using OSSIndex
- Launch of mass SCA is now logged in Audit log
- Swagger no longer requires internet
- Changed the path to the statics from the backend (you need to fix `docker-compose.yaml`)
- Fixed a bug due to which in packages of the same name (with different versions) located in different manifests, information about the file in which the package was found was incorrectly displayed

### [2022.49.1] - 2022-12-07

- Fixed the work of the project page

### [2022.49.0] - 2022-12-07

- Added login events to Audit log
- Added processing of the unresolved node
- Added a new condition in policies for missing component version
- Changed installation API
- Fixed analysis when there is no env in the dependency graph

### [2022.48.2] - 2022-12-04

- Added support for modern yarn
- Changed the mechanism for classifying dependencies as direct
- Added unresolved section for dependencies that are in the lock file, but do not have a parent component

## Console agent Johnny

### [2024.29.0] – 2024-07-19

- Added export of links and CWE to sarif format

### [2024.26.0] - 2024-06-24

- Added parsing in npm environment
- Added parsing in dotnet environment
- Added parsing in the poetry environment
- Added launch parameter `--block-on-empty-result` (returns code 3 if the scan result is empty)
- Added `--python-version` flag to specify the python version in the pypi manifest family
- Fixed the construction of the dependency graph on the pair `package.json` and `package-lock.json`
- Improved parsing of `project.assets.json`

### [2024.21.0] - 2024-05-24

- Improved yarn.lock parsing
- Fixed parsing in yarn environment

### [2024.17.0] – 2024-04-27

- Added Johnny build for Mac with Intel processors
- Fixed scala-dependency-tree parser

### [2024.15.0] – 2024-04-11

- Added support for uploading scan results in CSV format
- The path to the source file in which the dependency was found has been added to the scan result upload
- Improved search for .net packages when scanning images

### [2024.13.0] – 2024-03-28

- Added support for uploading scan results in [SARIF](https://sarifweb.azurewebsites.net) and XML formats

### [2024.10.2] – 2024-03-07

- Fixed merging lock files with manifests on Windows

### [2024.9.0] – 2024-02-29

- Fixed crash when parsing go.sum

### [2024.7.0] – 2024-02-12

- Reduced the size of the Docker image with the agent
- Fixed a bug when hashing empty files

### [2024.5.0] – 2024-01-31

- Added Scala support
- Added dependency resolution in the go environment (`--go-resolve`)
- Added dependency resolution in the maven environment (`--maven-resolve`)
- Added dependency resolution in yarn environment (`--yarn-resolve`)
- Improved error messages in query parameters
- Added installation variables URL (`cli.api_url`) and TOKEN (`cli.api_token`) to the config
- The summary now counts the number of vulnerabilities, not packages
- Increased the width of tables when it is impossible to determine the width of the terminal

### [2023.49.0] – 2023-12-08

- Added support for parsing Rust manifests `cargo.lock` and `cargo.toml`
- Added `--no-recursion` parameter to disable recursive scanning of the scan dir command

### [2023.48.0] – 2023-11-22

- Added setting the output format of the table with results `-f --format` (with the ability to turn off colors)
- Added setting for grouping vulnerabilities in the output of `-g --group-vulnerabilities-by`
- Added setting for sorting vulnerabilities in the output of `-s --sort-vulnerabilities-by`
- Added setting of analysis timeout limit `-t --timeout`

### [2023.43.0] – 2023-10-27

- Added summary information about the severity of vulnerabilities to the console output
- Fixed parsing of `.gradle.kts` manifests

### [2023.38.0] - 2023-09-20

- Improved parsing of package.json and composer.json manifests

### [2023.35.0] - 2023-08-31

- Improved parsing of the environment field for the `Gemfile` and `Gemfile.lock` manifests
- Removed automatic merging of cells with the same CVSS value in the table with vulnerabilities

### [2023.33.0] - 2023-08-17

- Optimized output of tables to the console on small screens

### [2023.30.0] - 2023-07-27

- Added `conanfile.py` parsing for Conan
- Added indication of the active analysis process in the form of a progress bar
- Added a table display for displaying alerts and vulnerabilities in the console
- Unified processing of slash at the end of a line for the `scan dir` command

### [2023.27.0] - 2023-07-06

- Fixed panic when analyzing some Go projects
- Fixed scanning of images in terms of incorrect detection of components that are not dependencies

### [2023.26.0] - 2023-06-30

- Improved parsing of `gradle-dependency-tree` in terms of working with classPath strings
- Fixed output of Policy Alerts to the console

### [2023.23.0] - 2023-06-08

- Added parsing of different versions of the `conan.lock` format
- Fixed the parser flag being reset when reaching an empty line in `conanfile.txt`
- Fixed `yarn.lock` parsing

### [2023.21.0] - 2023-05-23

- Added launch parameter `--scan-depth` to configure archive scanning depth
- Added `--scan-files` flag to the scan image command to scan files inside a docker image
- Improved detection of nested dependencies of jar packages
- Fixed `Gemfile` parsing

### [2023.15.0] - 2023-04-14

- Added Fixed version output
- Added the ability to save scan results
- Added the ability to create a project
- Added search for system dependencies in the docker image
- Optimized parsing of `package-lock` v3 manifest for NPM
- Fixed some bugs

### [2023.11.0] - 2023-03-16

- Added support for console commands
- Improved parsing of `pyproject.toml`
- Added cleaning of the /tmp directory after scanning the docker image

### [2023.5.0] - 2023-02-01

- Added scanning of docker images
- Changed behavior when starting without a project
- Updated Golang to 1.19
- Fixed hashing in archives with the `--only-hashes` option
- Fixed detection of broken and password-protected archives

### [2023.3.0] - 2023-01-20

- Fixed a bug when parsing `gradle-dependency-tree`

### [2023.2.0] - 2023-01-13

- Added scanning of archives, flag to run `--scan-archives`

### [2022.52.0] - 2022-12-30

- Fixed parsing of `pom.xml` in terms of working with the dependencyManagement section

### [2022.50.0] - 2022-12-12

- Added support for parsing `conan.lock` files
- Fixed passing additional data for the resolver from Nuget manifests


## Nexus OSA

### [2024.28.0] - 2024-07-10

- Added scanning of archives in `.gem` format for Ruby repositories

### [2024.26.0] - 2024-06-27

- Added the `Append repository name to image name for Docker repositories` setting to allow working with the RepoPath approach for Docker registries
- Removed the ability to manually start scanning the entire repository from the plugin side (flag `Run manual scan on save`)
- The `Block downloads in case of plugin or CodeScoring errors` setting now takes into account scanning failures (status `blocked_scan_failed`)

### [2024.21.0] - 2024-05-24

- Added Capability, which activates scanning for all repositories (`CodeScoring All Repositories Scan`)
- Added the ability to specify your own blocking message
- Added a link to the reason for blocking in the component properties
- Lowered the logging level for the message about skipping a repository scan
- Added repository manager URL setting

### [2024.7.0] – 2024-02-17

- Added a link to the component page in CodeScoring in the blocking message
- Added blocking message for situations where registry is not added to CodeScoring

### [2024.2.0] – 2024–01-12

- The list of image architectures has been expanded
- Added support for new component blocking statuses

### [2023.48.0] – 2023-11-22

- Added new operating mode `spectator`
- Added support for scanning multi-platform Docker images

### [2023.44.0] – 2023-10-31

- Added support for scanning proxy Docker repositories based on Sonatype Nexus and JFrog Artifactory

### [2023.43.0] – 2023-10-27

- Added various [plugin operating modes](/osa/nexus_osa.en/#_3)

### [2023.40.0] - 2023-10-04

- Added Capability for checking images from Hosted Docker Repository

### [2023.37.0] - 2023-09-11

- Fixed an error with saving scan results when required fields were missing

### [2023.36.0] - 2023-09-05

- Added an option to block the build when receiving an error interacting with the CodeScoring installation

### [2023.33.0] - 2023-08-15

- Added the option to save artifact scan results to the Nexus database
- Added a method to the API to retrieve artifact scan results

### [2023.26.0] - 2023-06-30

- Added support for scanning open-source components in hosted repositories

### [2023.6.2] - 2023-02-09

- Added proxy server setting in the plugin configuration

### [2023.6.0] - 2023-02-07

- Added the HTTP Client Connection Pool Size parameter in the plugin configuration to control the number of installation requests

### [2023.4.0] - 2023-01-24

- Improved parsing of RubyGems components

### [2022.51.0] - 2022-12-20

- Improved [logging of installation responses](/osa/nexus_osa.en/#_4)

## JFrog OSA

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

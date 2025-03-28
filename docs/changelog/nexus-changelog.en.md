---
hide:
 -footer
---
# Nexus OSA Changelog

### [2025.12.0] - 2025-03-17

- Improved accuracy of analysis in RPM and Debian repositories: improved detection of namespaces, distribution and architecture qualifiers to PURLs
- Added Circuit Breaker mechanism to the plugin to prevent Nexus performance degradation in case of unavailability or timeouts on the installation side

### [2025.9.0] - 2025-02-25

- Fixed the Docker image link sent by the plugin for analysis in the CodeScoring installation. The link format changed in Nexus Repository 3.75 release

### [2025.5.2] - 2025-01-31

- Fixed a 500 error when attempting to scan an unknown repository format plugin

### [2025.5.1] - 2025-01-27

- Fixed the missing namespace in PURL for NPM packages in Nexus Repository 3.75 release

### [2025.5.0] - 2025-01-27

- Fixed an issue with spaces in the ignored repository names list and the repository formats list for scanning 

### [2024.49.0] - 2024-12-05

- Added sending to CodeScoring a link to the package and the user downloading it. Compatible with installation version 2024.48.0 and higher
- Added support for Nexus 3.75

### [2024.46.0] - 2024-11-15

- Added support for PHP Composer repositories. Available when using [community plugin](https://github.com/sonatype-nexus-community/nexus-repository-composer/tree/master)
- Updated support for plugin compatibility with different versions of Nexus Repository:
        - for Nexus Repository OSS **3.71+** and Nexus Repository Pro versions from **3.33.1-01** to **3.71+**, a version of the plugin with H2 and PostgreSQL support has been released
        - for Nexus Repository OSS versions from **3.33.1-01** to **3.70.Х**, a legacy version of the plugin with OrientDB support has been allocated

### [2024.42.0] - 2024-10-16

- Added ability to specify format of repositories to analyze using the `All Repositories Scan` capability

### [2024.34.0] - 2024-08-19

- Added support for Nexus 3.71

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

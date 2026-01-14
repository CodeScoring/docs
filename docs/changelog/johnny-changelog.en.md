---
hide:
  - footer
---

# Johnny Changelog

### [2026.3.0] - 2026-01-13

#### Added

- Added the `--create-project-group` flag for creating a group and adding a project to it
- Added the `--project-categories` flag for specifying the categories of the project being created
- Added the `--localization` flag for localizing the agent's output (coloredtable, table, text, csv formats)
- Added the `--gitleaks-config` flag of the `secrets gitleaks` command to pass the path to the gitleaks config file
- Added the `--policy-ignores` and `--ignores-format` flags for outputting policy ignores in the specified format
- Added support for the lockfile text format for the bun package manager (1.2 and later)
- Added a build of the Johnny console agent for Linux with ARM processors
- Added validation for SBOM scanning (supported Formats: 1.4, 1.5, 1.6, 1.6_ext)
- Added support for exporting SBOM in 1.7 format
- Added support for the Svace call graph for the Kotlin language
- Added correct handling of transitive dependencies without purl when importing SBOM
- Added output of the LineEnd value for the position of the detected and monitored secret
- Added output of the vulnerability impact when exporting the results to CSV format

#### Changed

- Added the `Critical` severity for each secret in the report on found secrets
- Changed paths during secret scanning to relative ones
- The entire list of manifests processed by the agent is now output, even if no dependencies are found in them
- General information about the analysis result is now always output to the console, even when the output is redirected to a file
- Changed the OS release detection logic for the `scan build` command
- Libraries that failed the ldconfig check Added to the unresolved list in the `scan build` command

#### Removed

- Discontinued publishing of console agent images with the `{VERSION}-busybox` tag

#### Fixed

- Fixed a panic when importing some SBOMs

### [2025.45.4] - 2025-12-12

#### Fixed

- Fixed a loop on some JavaScript projects when processing the workspace

### [2025.45.3] - 2025-12-01

#### Changed

- Optimized gradle-dependency-tree processing

### [2025.45.2] - 2025-11-19

#### Added

- Added output of the Summary field when exporting scan results in CSV format

### [2025.45.1] - 2025-11-14

#### Fixed

- Fixed relative paths to manifests in scan results for .NET, uv, and npm/pnpm projects
- Fixed `packages.lock.json` association mechanism in projects using sln
- Fixed image scan results output

### [2025.45.0] - 2025-11-05

#### Added

- Added vulnerability reachability analysis for Go
- Added vulnerability reachability analysis for Python
- Added support UV package manager for Python ecosystem
- Added printing matched criteria in policy alerts (starting from platform version **2025.45.0**)
- Added flags `--branch-or-tag` and `--commit` in `scan bom` command
- Added support workspaces mechanism for npm and pnpm
- Added unloading of the HasExploit flag to the junit and gitlab formats
- Added using `dpkg` for define information about static libraries in `scan build` и `scan build ebpf` commands
- Added support `pipdeptree` for Python ecosystem via the `--pipdeptree-resolve` option
- Added printing paths to manifest inside scanned image

#### Changed

- Changed printing of reachability paths on table format. Printing top 5 paths and hidden count
- Optimized printing of reachability paths

#### Removed

- `scan build` and `scan build ebpf` commands removed from not Linux binary
- Building scratch images of the CLI agent discontinued. All tags links to busybox version

#### Deprecated

- Building images of the CLI agent with tag `*-busybox` will be discontinued in release 2026.3.0

#### Fixed

- Fixed different result in processing npm with `--npm-resolve` and with existed `package-lock.json`
- Removed duplicates vulnerabilities in reachability graph
- Fixed printing path to lock file when using local resolve
- Fixed printing policy alerts: added validation to exclude empty objects
- Fixed processing of `gradle-dependency-tree.txt`
- Fixed processing of comments in some manifest types
- Removed duplicates in `scan image` command with `--scan-files` flag


### [2025.37.2] - 2025-10-06

#### Fixed

- Fixed an error determining paths to the `.csproj` and `project.assets.json` manifests when scanning .NET projects

### [2025.37.1] - 2025-09-22

#### Fixed
- Fixed local gitleaks version validation issues

### [2025.37.0] - 2025-09-08

#### Added

- Added vulnerability reachability analysis for Java and Svace call graph, as well as output of reachability examples in SARIF (starting from platform version **2025.37.0**)
- Added the ability to run local scans without specifying activation parameters (`--api_url` and `--api_token`), generating an SBOM based on detected manifests without enrichment and policy application
- Added support for `deps.json` and `sln` manifests for the .NET stack
- Added support for all component types from the PURL specification, including the generic type, as well as components with empty or invalid PURLs when analyzing SBOM with the `scan bom` command
- In the `scan bom` command, added pre-conversion of the file to UTF-8 encoding for correct further processing
- Added the ability to run `sign bom` and `verify bom` commands without specifying activation parameters (`--api_url` and `--api_token`)
- Added transfer of annotated data (`GOST:attack_surface`, `GOST:security_function`, `GOST:source_langs`, `VCS`, `licenses`) to the platform when importing annotated SBOM (starting from platform version 2025.37.0)
- Added the ability to specify branch/tag and commit when scanning an image
- Added the option to select the progress bar type: `spinner` or `text` (default: `spinner`)

#### Changed

- Changed the logging level for policy triggers from error to warning
- Changed the display of the number of alerts for triggered policies
- Changed the resolution logic in the JavaScript environment: local resolution is not performed if any of the known lock files (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) are present
- Improved linking mechanism for Gradle when using arbitrary manifest names. Now `build.gradle` and `gradle.lockfile` are automatically linked even if their names differ. If `gradle-dependency-tree.txt` is present, it takes priority, and other files are processed separately
- Changed the order of checking the ability to run a command and obtain analysis results according to the platform license. This now happens before the scan is performed

#### Fixed

- Fixed processing of `requirements.txt` containing a comment about another dependency source

#### Deprecated

- Building scratch images of the CLI agent will be discontinued in release 2025.45.0

### [2025.29.3] - 2025-08-22

#### Fixed

- Fixed argument forwarding to package managers when using the local resolve mechanism in the absence of a lockfile.

### [2025.29.2] - 2025-07-25

#### Fixed

- Fixed crash when processing dependencies for which the environment could not be determined

### [2025.29.1] - 2025-07-18

#### Fixed

- Fixed error when exporting results in `junit` format

### [2025.29.0] - 2025-07-16

#### Added

- Added parsing of dependencies declared in unified format in `build.gradle`
- Added `sign bom` command to sign SBOM files
- Added `verify bom` command to verify the authenticity of the SBOM file signature
- Added work with the predefined `CodeScoring_All_Dependencies` task for correct dependency resolution in multi-module projects of the gradle environment
- Added the `project-proprietor` parameter to link the scanned project to the department (since version **2025.29.0** of the platform)
- Added support for aliases for `yarn.lock` and `pnpm-lock.json`
- Added support for reports for alerts in the following formats: coloredtable, table, text, json, csv. The format is controlled by the `--alerts-format` parameter
- Added `--branch-or-tag` and `--commit` flags to the `scan build` and `scan build ebpf` commands
- Added unloading of the HasExploit flag to the sarif format
- Added output of license information to the text, table, coloredtable formats
- Added unloading of Relation, Parents, Match type, Env data to the CSV format
- Added the ability to pass flags to package managers when resolving dependencies
- Added output of a warning about parsing errors during scanning
- Added support for dependency groups with an arbitrary name in `pyproject.toml`
- Added the ability to pass the SHA hash of an image in the `--hash` parameter of the `scan image` command (since version **2025.29.0** of the platform)
- Added a check for the availability of the `dir` command of the local version of `gitleaks`

#### Changed

- Disabled running the parser in the pip environment by default in the `scan python` command. Enabled explicitly with the `--pip-resolve` flag
- Improved the performance of the `scan build ebpf` command

#### Fixed

- Fixed ignoring behavior for empty `--ignore` parameter values
- Fixed an error in determining the relation dependency when parsing a pair of `package.json` and `yarn.lock` manifests
- Fixed determining the environment in cases where a dependency of the same version is present in multiple environments
- Fixed `poetry-core` from the `build-system` section getting into the list of dependencies when parsing the `pyproject.toml` manifest

### [2025.21.0] - 2025-05-21

- Added `scan build ebpf` command to scan C/C++ project builds using eBPF
- Added export to sarif of data on dependency relationships within a project, direct or transitive, in the format: `results.properties.relation: direct|indirect`
- Added ignoring of commented lines when parsing `conanfile.py` files
- Fixed version detection from requirements of the type `==3.0.0.post1` in Python manifests
- Fixed upload of vulnerabilities to sarif that have criticality specified without a numerical assessment
- Fixed parsing in the Go environment: transitive dependencies for which it was not possible to determine the parent package are excluded from the scanning results

### [2025.13.0] - 2025-03-28

- Added support for parsing Swift ecosystem manifests: `Package.swift` and `Package.resolved` (starting with version 2025.13.0 of the platform)
- Added a beta version of the console agent with the Secrets module (starting with version 2025.13.0 of the platform)
- Added processing of corrupted `scala-dependency-tree.txt` files
- Added parsing of dependencies declared in an unmerged format in the `build.gradle.kts` file
- Added ignoring `.nuspec` files in the `scan csharp` command
- Added support for AltLinux operating systems in the `scan build` command
- Excluded Java archives from scanning when the `--scan-archives` flag is inactive
- Fixed import SBOM in which the library has multiple values of the `env` property
- Fixed processing of SBOM files in CycloneDX format containing information about components within components

### [2025.7.0] - 2025-02-13

- Added commands for scanning a directory with predefined settings depending on the selected technology (for example, `./johnny scan java`)
- Added output of information about the presence of Exploit for vulnerabilities in the agent's results
- Added the `--cloud-resolve` parameter to activate cloud resolver (compatible with platform of version 2025.7.0 and higher)
- Added support for the Selective dependency resolutions mechanism for Yarn
- Added support for the NPM Package Aliases mechanism for `package-lock.json`
- Optimized processing of large `gradle-dependency-tree.txt` files
- Fixed a bug in determining package versions in the `gradle.lockfile` file if there are suffix versions

### [2024.52.2] - 2025-01-23

- Fixed agent behavior that caused platform's tasks-policy queue to grow

### [2024.52.1] - 2025-01-16

- Fixed handling of multiple `gradle.lockfile` files per module

### [2024.52.0] - 2024-12-24

- Added [scan build](/agent/scan-build.en) command for build analysis for C and C++ languages
- Added new formats for exporting work results: [GitLab Dependency Scanning Report](https://docs.gitlab.com/ee/user/application_security/dependency_scanning/) and [GitLab Code Quality Report](https://docs.gitlab.com/ee/ci/testing/code_quality.html)
- Added handling of the `--ignore` parameter when scanning archives and files inside images
- Added the ability to specify a link to a branch/tag and commit using the `branch-or-tag` and `commit` parameters when scanning a file and directory (when interacting with platform version `2024.52.0` and higher)
- Added the ability to specify a hash using the `hash` parameter when scanning images (when interacting with platform version `2024.52.0` and higher)
- Added the ability to specify a policy stage when creating a CLI project (when interacting with platform version `2024.52.0` and higher)
- Added specifying paths to manifests inside scanned images where information about a vulnerable package was found
- Added paths to manifests where a vulnerable package was found in `sarif` format
- Fixed crash when processing an incorrect file in `yaml` format
- Added handling of an error that occurs when a file was deleted during scanning
- Fixed the presence of extra characters when unloading in `sarif` format
- Fixed environment detection when parsing Poetry manifests
- Fixed scanning of RedHat-based images

### [2024.48.2] - 2024-12-13

- Fixed crash when processing some `gradle-dependency-tree.txt` files
- Fixed parsing of npm and yarn lock files paired with a manifest

### [2024.48.1] - 2024-12-10

- Added support for multiple versions of a single package in the `poetry.lock` file
- Added the ability to run without waiting for analysis results (`--no-wait` parameter)

### [2024.48.0] – 2024-11-29

- Added support for parsing Conda ecosystem manifests: `environment.yml`, `meta.yml`, `conda-lock.yml`
- Added support for parsing Conda components in the build environment
- Added warning output for packages with an invalid name
- Improved dependency graph construction for formats that allow multiple versions of a single package
- Improved dependency graph construction when both files of a manifest-lockfile pair are present
- Fixed errors in generating PURL and go package versions when scanning Docker images
- Fixed handling of SBOM files in CycloneDX format containing information in the `components[i].evidence.identity` fields
- Changed the logic for generating the distro property for PURL ALT Linux packages when scanning Docker images
- Added information about Location and Fixed Version of a vulnerability to the `sarif` format export

### [2024.44.1] - 2024-11-15

- Fixed a bug with skipping gem packages in the `scan bom` command
- Fixed the `ignore` flag on Windows OS
- Fixed a bug in the parser in the Go environment on projects without dependencies

### [2024.44.0] - 2024-11-02

- Added parsing of `pnpm-lock.yaml` manifests. Supported versions: 5.0-5.4, 6.0, 9.0
- Added parsing in the pnpm environment
- Takes into account the use of the `pnpm-workspaces.yaml` configuration file when parsing `package.json`
- Added the ability to specify a group when creating a CLI project, for admin role only
- Added the ability to specify the format of the generated SBOM using the `--bom-format` parameter (starting with on-premise version 2024.44.1)
- Implemented parsing in the pip environment
- Implemented parsing in the composer environment
- When resolving dependencies in the go environment, the mechanism for determining the parent library for transitive dependencies obtained from the test environment has been improved
- Fixed the `unsupported type` error for composer components in the `scan bom` command

### [2024.40.2] - 2024-10-18

- Fixed dependency graph construction in cases where a component occurs multiple times with different `bom-ref`

### [2024.40.1] - 2024-10-10

- Added merging of `pom.xml` and `mvn-dependency-tree.txt` parsing results to avoid unnecessary dependency resolution
- Fixed an error in checking for the presence of a lock file when using dependency resolution in the environment

### [2024.40.0] - 2024-10-02

- Added workspaces parsing when working with npm manifests
- Fixed `Gemfile.lock` parser for cases with multiple Gem sections

### [2024.39.0] - 2024-09-23

- Separated tags when unloading in sarif format to display all versions of the found package in DefectDojo
- Changed export of severity in sarif format to correctly display CVSS3 in DefectDojo
- Fixed issues with scanning SBOM containing Go packages
- Fixed panic when parsing empty `cargo.lock`
- Removed duplication of vulnerabilities in sarif format for cases of multiple versions of the same package
- Removed the ability to simultaneously use the `format` and `no-summary` flags

### [2024.36.0] - 2024-09-05

- Added the ability to configure the used parsers via the configuration file
- Added the ability to specify the parser used in the scan file command
- Fixed parsing of multi-project/module gradle-dependency-tree

### [2024.35.0] - 2024-08-20

- Fixed gradle-dependency-tree kotlin parsing

### [2024.32.0] - 2024-08-09

- Added analysis of standard go libraries to the parser in the go environment (`--go-resolve`)
- Added the ability to specify a license when creating a project
- Fixed an error when parsing `pom.xml`, which contains variables like `xxx.xxx.xxx.xxx`
- Fixed `scala-dependency-tree.txt` parser
- Fixed an error when scanning SBOM without a component section

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
- Added platform variables URL (`cli.api_url`) and TOKEN (`cli.api_token`) to the config
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
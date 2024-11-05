---
hide:
 -footer
---
# Johnny Changelog

### [2024.44.0] - 2024-11-02

- Added parsing of `pnpm-lock.yaml` manifests. Supported versions: 5.0-5.4, 6.0, 9.0
- Added parsing in the pnpm environment
- Added the ability to specify a group when creating a CLI project
- Added the ability to specify the format of the generated SBoM
- Implemented parsing in the pip environment
- Implemented parsing in the composer environment
- Takes into account the use of the `pnpm-workspaces.yaml` configuration file when parsing `package.json`
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
- Fixed issues with scanning SBoM containing Go packages
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
- Fixed an error when scanning SBoM without a component section

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
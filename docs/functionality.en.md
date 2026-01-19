---
hide:
- footer
---

# Functional characteristics

## General functional characteristics

The modular platform for secure development **CodeScoring** provides solutions for the problems of secure use of **open source**, identification of secrets in code and assessment of development quality.

The platform includes the following modules:

- **CodeScoring.OSA (Open Source Analysis)** – supply chain protection: verification of third-party components for compliance with security policies and blocking in case of non-compliance;
- **CodeScoring.SCA (Software Composition Analysis)** – compositional analysis: auto-detection of **open source** dependencies, identification of vulnerabilities and malicious components, verification of license compatibility, formation of a list of software components and construction of a dependency graph;
- **CodeScoring.Secrets** – search for secrets in code: orchestration of source code checks for confidential information (**secrets**) and assessment of truth using our own machine learning model;
- **CodeScoring.TQI (Teams & Quality Intelligence)** – assessment of code quality through calculation of key quality metrics, tracking development dynamics and building profiles of development participants with confirmed competence in projects.

The platform comprehensively provides:

- analysis of 20 programming languages (the list of languages may vary for individual modules): **Java**, **Kotlin**, **JavaScript**, **TypeScript**, **Python**, **C**, **C++**, **Go**, **PHP**, **Ruby**, **C#**, **Objective-C**, **Swift**, **Rust**, **Scala**, **Bash**, **Perl**, **SQL**, **PLSQL**, **PGSQL**;
- analysis of manifests of packaging ecosystems: **Maven**, **Gradle**, **Apache Ivy**, **NPM**, **Yarn**, **pnpm**, **NuGet**, **Paket**, **pip**, **Poetry**, **Pipenv**, **Conda**, **Ruby Gems**, **Cocoapods**, **Swift**, **Composer**, **Conan**, **Go Modules**, **Cargo** and **sbt**;
- integration with repository managers and container image registries: **Nexus Repository Manager**, **JFrog Artifactory Pro**, **Harbor**, **GitLab**, **GitFlic**, **Sfera.Distributions and Licenses**;
- integration with **hosted** and **cloud** code hosting systems: **GitFlic**, **GitLab**, **Github**, **Bitbucket** and **Azure DevOps**;
- universal integration into build systems using an agent: **Jenkins**, **GitLab**, **GitFlic**, **TeamCity** and others;
- management of organizational security policies;
- automation of scheduled scan launches;
- integration for email notifications;
- integration with the **Jira** task management system;
- user management system;
- **LDAP** integration;
- creation of webhooks;
- differentiation of access rights for different users;
- logging of all performed operations (**audit log**);
- collection of metrics on performed operations;
- open and documented programming interface (**API**).

## Functional characteristics of the **CodeScoring.OSA** module

- blocking the download of unwanted components when trying to download them through the command interface of the package manager or the web interface;
- forming a list of software components (**SBOM**, Software Bill of Materials);
- checking artifacts in the registries of container images;
- proxying and control of package downloads via the [OSA Proxy](/osa-proxy/index.en) service for popular package managers (Maven, NPM, PyPI, NuGet);
- archive analysis, including:
        - parsing the contents of popular archive formats (**zip**, **jar**, **tar**, **war**, **tgz** and others);
        - analysis of system packages, including support for popular package managers:
            - **DEB** (Debian, Ubuntu);
            - **RPM** (RHEL, CentOS, Fedora);
            - **APK** (Alpine Linux);
- setting up security criteria (**policies**) by 40 criteria, including:
        - package metadata: name, version, package author, age, date;
        - vulnerability criteria: identifier, **CVSS** score, threat level, publication date, age, presence of exploit, impact;
        - license categories and types, license compatibility (**license purity**);
        - package usage indicators: directive/transitive and environment (**scope**);
        - presence of malicious code;
        - package blacklists, including a proprietary **protestware** feed;
- detection and deduplication of vulnerabilities from 20 knowledge bases, including aggregation (**NVD**, **OSV**, **GHSA** and others), ecosystem (**Debian**, **RPM**, **Alpine** and others), commercial (**Kaspersky OSS Threats Data Feed**) and proprietary, including data on **protestware**;
- component management in the interface, including:
        - viewing and filtering the list of packages;
        - viewing and filtering the list of container images;
        - viewing and filtering component requests;
- export of reports.

## Functional characteristics of the **CodeScoring.SCA** module

- analysis of package manager manifests;
- formation of a list of software components (**SBOM, Software Bill of Materials**);
- checking **open source** at all stages of the development cycle with the ability to set security policies for individual stages of the development cycle:
        - code checking in development environments (**IDE**): **IntelliJ-based**, **VSCode**, **OpenIDE**;
        - checking on the developer's local machine (**CLI agent**);
        - continuous code monitoring (scanning repository branches);
        - checking in the **CI pipeline** with a universal agent with the ability to block the build;
        - post-release monitoring **SBOM**;
        - post-release code monitoring (scanning repository tags);
- detection of **open source** dependencies:
        - by ecosystem, package name and version;
        - by configuration files (**manifests**) of package managers;
        - via the mechanism for resolving transitive dependencies;
        - via the mechanism for identifying **open source** inclusions in the vendor metadata base, using flexible search algorithms;
        - via assembly analysis for the **C** and **C++** languages;
        - separation of directive and transitive dependencies and determination of the relationship to the development environments (**scope**): **runtime**, **compile**, **test**, **provided** and others;
- construction of a dependency graph with the ability to trace the use of transitive components;
- updating information about detected dependencies:
        - general information about the dependency: detection method; package release date; package author; official web page; link to placement in the package index; scope of use (**scope**) and link to the relationship graph; link to the manifest;
        - vulnerability information;
        - license information;
        - usability in the organization's projects;
- provision of vulnerability information:
        - identifiers in knowledge bases;
        - vulnerability description;
        - severity assessment according to **CVSS 2** and **CVSS 3.1**;
        - links to additional vulnerability indices;
        - recommended package version for update;
        - list of all projects affected by the vulnerability;
        - additional materials containing links to patches, exploits, and vulnerable commits;
- provision of license information:
        - project license landscape;
        - **SPDX** license identifier;
        - license text;
        - brief overview of the license terms;
        - information on license compatibility (**license compliance**);
- detection and deduplication of vulnerabilities from over 20 knowledge bases, including aggregation (**NVD**, **OSV**, **GHSA** and others), ecosystem (**Debian**, **RPM**, **Alpine** and others), commercial (**Kaspersky OSS Threats Data Feed**) and proprietary, including data on **protestware**;
- configuration of security policies by 40 criteria, including:
        - package metadata: name, version, package author, age, date;
        - vulnerability criteria: identifier, **CVSS** score, threat level, publication date, age, presence of exploit, impact;
        - license categories and types, license compatibility (**license purity**);
        - package use indicators: directive/transitive and environment (**scope**);
        - presence of malicious code;
        - package blacklists, including a prepared **protestware** feed;
- configuring security policies separately for scanning code in repositories, **CI pipeline** and the local developer machine, indicating the stage of the development cycle;
- a system for displaying scan results for each individual stage and the ability to manage ignored events;
- the ability to configure protection against popular attacks on the supply chain;
- the ability to configure temporary ignoring of triggering policies based on various criteria: project, technology, package, license type, vulnerability identifier, for individual policies;
- exporting reports in popular formats: **CycloneDX**, **SPDX**, **JUnit**, **SARIF**, **CSV**, **GitLab Dependency Scanning Report**, **GitLab Code Quality Report**;
- vulnerability reachability analysis.

## Functional characteristics of the **CodeScoring.Secrets** module

- detection of sensitive data in code, including passwords, **API keys**, tokens, credentials;
- use of a proprietary machine learning model to filter false positives;
- integration with version control systems (**VCS**) for automatic repository monitoring;
- customization of secret search criteria with the ability to configure detection rules;
- launching secrets analysis:
        - selection of scanning of a separate branch or the entire repository;
        - manual launch of analysis in individual projects;
        - general scanning of all projects of the organization;
        - uploading reports on secrets found by third-party tools to the system;
- providing detailed information on found secrets:
        - detection context (project, file, change author);
        - assessment of the probability of the truth of the secret;
        - date of secret detection and correction;
- management of found secrets:
        - viewing the list of found secrets;
        - confirmation of false positives and their exclusion from further scans;
        - marking secrets as resolved;
- managing the **ML model** training process to improve detection accuracy:
        - marking detected secrets by the user;
        - retraining the model on the marked data;
        - comparing the results of the retrained model with the original version;
        - ability to roll back to the base model;
- integration with **DevSecOps** processes:
        - work in the **CI/CD pipeline** with the ability to interrupt the build when secrets are detected;
        - analysis of secrets on the developer's local machine via the **CLI agent**;
- flexible reporting and notification system:
        - displaying scan results at the level of the organization, project, and individual repository;
        - filtering results;
        - exporting reports with a list of secrets or their properties.

## Functional characteristics of the **CodeScoring.TQI** module

- building a project profile, detailing the technical and authoring composition of the development;
- building a developer profile, detailing their work in the analyzed projects taking into account the volume of work and the quality of the changes made;
- automatic assessment of the similarity of developers in the analyzed projects by experience of participation and technologies;
- searching for developer activity in **open source** projects;
- analysis of borrowings using fuzzy search algorithms (tolerance to renaming of objects in the code):
        - searching for intra-project code duplicates;
        - searching for cross-project code duplicates;
        - determining the volume of found borrowings;
        - building an interactive map of borrowings;
        - determining the time of borrowing;
        - linking authorship to found code duplicates;
- assessing the complexity of project maintenance:
- calculating the cyclomatic complexity of the code in the context of the project;
- calculation of cyclomatic complexity of code in terms of the author;
- construction of analytical retrospective maps:
        - development of projects;
        - work of authors;
        - evolution of project complexity;
- integration into the software development cycle (**SDLC**) through integration with source code versioning systems.
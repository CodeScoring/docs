---
hide:
  - footer
---
# Functionality

## General functionality

- support for analysis of 18 programming languages;
- support for analyzing manifests of package ecosystems: **Maven, Gradle, NPM, NuGet, PyPi, Ruby Gems, Cocoapods, Composer, Conan, Go Modules, Cargo and sbt**;
- integration with proxy repositories: **Nexus Repository Manager, JFrog Artifactory Pro**;
- integration with **version control systems**: **Gitlab, Github, Bitbucket and Azure DevOps**;
- universal integration into build systems using a CLI agent: **Jenkins, Gitlab, Teamcity, etc.**;
- maintaining a component inventory (**SBoM, Software Bill of Materials**);
- reports;
- management of notification policies;
- integration of mail notifications;
- integration with the task management system **Jira**;
- user management system and integration via **LDAP**;
- differentiation of access rights for different users;
- logging of all performed operations (audit log);
- open **API** for integration with any element of the system.

## Functional characteristics of SCA (Software Composition Analysis)

- analysis of **Docker** images;
- analysis of system packages;
- analysis of package manager manifests;
- **Open Source** check at all stages of the **DevSecOps** cycle with the ability to set security policies for **individual project stages**:
 + continuous monitoring (scanning repository branches);
 + post-release monitoring (scanning repository tags);
 + checks in the **CI pipeline** by a universal agent with the ability to block the build;
 + check on the developer’s local machine (**CLI agent**);
- detection of **Open Source** dependencies:
 + by ecosystem, package name and version;
 + according to configuration files (manifests) of package managers;
 + through the mechanism for resolving transitive dependencies;
 + through a mechanism for identifying **Open Source inclusions** using a vendor metadata database and flexible search algorithms;
- separation of direct and transitive dependencies and determination of the relationship to development environments (scope): **runtime, compile, test, provided and others**;
- construction of dependency graph with the ability to trace the use of transitive components;
- updating information about detected dependencies:
 + general information: detection method; package release date; package author; official web page; link to the index; application environment (**scope**) and link to the dependency graph; link to manifest;
 + information about vulnerabilities;
 + information about licenses;
 + usage in the organization’s projects;
- providing information about vulnerabilities:
 + identifiers in knowledge bases;
 + description of the vulnerability;
 + severity assessment according to **CVSS 2 and CVSS 3.1**;
 + links to additional vulnerability indexes;
 + recommended package version for update;
 + list of all projects affected by the vulnerability;
 + additional links to vulnerabilities containing links to patches, exploits and vulnerable commits;
- provision of information about licenses:
 + licensed landscape of the project;
 + **SPDX**-license identifier;
 + license text;
 + a brief introduction to the license terms;
 + information about license compatibility (**license compliance**);
- identification and deduplication of vulnerabilities from knowledge bases:
 + **NIST National Vulnerability Database (NVD)**;
 + **Databank of information security threats (BDU FSTEC)**;
 + **Github Security Advisory (GHSA)**;
 + **Open Source Vulnerabilities (OSV)**;
 + **Sonatype OSSIndex**;
 + **Kaspersky Open Source Software Threats Data Feed** (connected upon request);
 + Vendor feed (**protestware**).
- setting up security rules (policies) according to 30 criteria, including:
 + package metadata: **name, version, package author, age, date**;
 + vulnerability criteria: **identifier, score, severity, publish date**;
 + categories and types of licenses, **vendor's license purity policy**;
 + according to the characteristics of the package: **directive/transitive and environment (scope)**;
 + according to package blacklists, including the prepared feed **toxic-repos (protestware)**;
- setting up security policies separately for scanning code in repositories, in proxy repositories, **CI pipeline** and the local developer machine, indicating the stages of project development (**stages**);
- a system for displaying scan results for each individual stage and the ability to manage ignored events;
- an ability to configure protection against popular attacks on the supply chain;
- an ability to configure policy ignores by different parameters: organization: project; technologies; package; license type; vulnerability identifier; for individual policies; ability to specify temporary event ignoring (from to).

## Functional characteristics of TQI (Teams & Quality Intelligence)

- building a profile of projects, detailing the technical and authoring composition of the development;
- building a profile of developers, detailing their work in the analyzed projects, taking into account the amount of work and the quality of the changes made;
- automatic scoring of similar developers in analyzed projects:
  + by experience in projects and technologies;
  + by similarity of technical base;
  + by proximity in quality characteristics;
- search for developer activity in **Open Source** projects;
- analysis of borrowings using fuzzy search algorithms (tolerance to renaming objects in the code):
  + search for intra-project code duplicates;
  + search for cross-project code duplicates;
  + determination of the volume of borrowings found;
  + construction of an interactive map of borrowings;
  + determination of the time of occurrence of borrowing;
  + linking authorship to found duplicate codes;
- assessment of the complexity of project support:
  + calculation of cyclomatic complexity of code in the context of a project;
  + calculation of cyclomatic complexity of code in the context of the author;
- construction of analytical retrospective maps:
  + project development;
  + works of authors;
  + evolution of project complexity.
- integration into the software development cycle (**SDLC**) through integration with source code versioning systems.
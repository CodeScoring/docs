---
hide:
  - footer
---
# Functional Characteristics

## General Functional Characteristics

- analysis of 20 programming languages;  
- analysis of package ecosystem manifests: **Maven, Gradle, NPM, NuGet, PyPi, Ruby Gems, Cocoapods, Composer, Conan, Go Modules, Cargo, and sbt**;  
- integration with repository managers: **Nexus Repository Manager, JFrog Artifactory Pro, Harbor, Gitlab**;  
- integration with **hosted and cloud-based** code hosting systems: **GitFlic, Gitlab, Github, Bitbucket, and Azure DevOps**;  
- universal integration into build systems using an agent: **Jenkins, Gitlab, TeamCity, etc.**;  
- maintaining a registry of component relationships (**SBoM, Software Bill of Materials**);  
- report generation;  
- notification policy management;  
- email notification integration;  
- integration with task management systems **Jira**;  
- user management system and integration via **LDAP**;  
- webhook creation;  
- access control for different users;  
- logging of all executed operations (audit log);  
- open **API** for integration with any system component.  

## Functional Characteristics of SCA (Software Composition Analysis)

- analysis of **Docker** images;  
- analysis of system packages;  
- analysis of package manager manifests;  
- **Open Source** verification at all stages of the development cycle with the ability to set security policies for specific project stages (**stages**):  
    + continuous monitoring (repository branch scanning);  
    + post-release monitoring (repository tag scanning);  
    + verification in the **CI pipeline** using a universal agent with build-blocking capability;  
    + local machine verification for developers (**CLI agent**);  
- detection of **Open Source** dependencies:  
    + by ecosystem, package name, and version;  
    + by package manager configuration files (manifests);  
    + through a mechanism for resolving transitive dependencies;  
    + through a mechanism for identifying **Open Source inclusions** using a vendor metadata database with flexible search algorithms;  
    + through build analysis for **C and C++** languages;  
- differentiation between direct and transitive dependencies and determining their relation to development environments (**runtime, compile, test, provided, etc.**);  
- building a dependency graph with the ability to trace transitive component usage;  
- updating information about detected dependencies:  
    + general dependency information: detection method; package release date; package author; official website; link to the package index; usage environment (**scope**) and dependency graph link; manifest link;  
    + vulnerability information;  
    + license information;  
    + usage in organizational projects;  
- providing vulnerability information:  
    + identifiers in knowledge bases;  
    + vulnerability description;  
    + criticality assessment based on **CVSS 2 and CVSS 3.1**;  
    + links to additional vulnerability indexes;  
    + recommended package version for updates;  
    + list of all projects affected by the vulnerability;  
    + additional links to vulnerabilities containing links to patches, exploits, and vulnerable commits;  
- providing license information:  
    + project licensing landscape;  
    + **SPDX** license identifier;  
    + license text;  
    + brief overview of license terms;  
    + license compliance information;  
- identification and deduplication of vulnerabilities from 20 aggregated and ecosystem knowledge bases, including:  
    + **NIST National Vulnerability Database (NVD)**;  
    + **Information Security Threats Database (BDU FSTEC)**;  
    + **Github Security Advisory (GHSA)**;  
    + **Open Source Vulnerabilities (OSV)**;  
    + **Sonatype OSSIndex**;  
    + **Kaspersky Open Source Software Threats Data Feed** (available upon request);  
    + Vendor feed (**protestware**).  
- configuring security criteria (policies) based on 40 parameters, including:  
    + package metadata: **name, version, author, age, date**;  
    + vulnerability criteria: **identifier, score, severity, publish date**;  
    + license categories and types, **vendor license compliance policy**;  
    + package usage characteristics: **direct/transitive and environment (scope)**;  
    + blacklisted packages, including the pre-configured **protestware** feed;  
- configuring security policies separately for code scanning in repositories, proxy repositories, **CI pipelines**, and local developer machines, specifying project development stages (**stages**);  
- system for displaying scan results for each stage with the ability to manage ignored events;  
- ability to configure protection against common supply chain attacks;  
- ability to configure policy exceptions at different levels across the organization: project; technology; package; license type; vulnerability identifier; individual policies; temporary event exceptions.  

## Functional Characteristics of TQI (Teams & Quality Intelligence)

- building project profiles, detailing technical and author composition of development;  
- building developer profiles, detailing their contributions to analyzed projects in terms of work volume and quality of changes made;  
- automatic scoring of similar developers in analyzed projects:  
    + based on experience in projects and technologies;  
    + based on technical background similarity;  
    + based on similarity of quality attributes;  
- searching for developer activity in **Open Source** projects;  
- plagiarism analysis using fuzzy search algorithms (tolerant to object renaming in code):  
    + searching for intra-project code duplicates;  
    + searching for cross-project code duplicates;  
    + determining the volume of detected borrowings;  
    + building an interactive borrowing map;  
    + identifying the time of borrowing occurrence;  
    + linking authorship to detected code duplicates;  
- assessing project maintainability complexity:  
    + calculating cyclomatic code complexity by project;  
    + calculating cyclomatic code complexity by author;  
- building analytical retrospective maps:  
    + project evolution;  
    + author contributions;  
    + project complexity evolution.  
- integration into the **SDLC** (Software Development Lifecycle) via source code versioning systems.  
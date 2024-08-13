---
hide:
  - footer
---
# CodeScoring OSA

## Overview

**CodeScoring** implements the OSA module through specialized plugins that block the downloading of unwanted components into the **Sonatype Nexus Repository** and **JFrog Artifactory**.

The plugin is built into the *request|response* chain of **Sonatype Nexus Repository** and **JFrog Artifactory**, which ensures that unwanted components are blocked during any attempt to download them using the command interface of the selected package manager or the web interface.

**Recommendations for installing and configuring the plugin:**

- [Sonatype Nexus Repository](/osa/nexus_osa.en)
- [JFrog Artifactory](/osa/jfrog_osa.en)

## Archive analysis

The plugins support scanning archives in the following formats:

| Ecosystem | Archive format |
|----------------|-------------------------------- ------|
| Maven | `.jar`, `.war`, `.ear` |
| NPM | `.tgz` |
| PyPI | `.zip`, `.tar`, `.tgz`, `.tar,gz`, `.tar.bz2`, `.egg`, `.whl` |
| Nuget | `.nupkg` |
| Cocoapods | `.tar.gz`, `.zip` |
| Go | `.mod`, `.zip` |
| Gems | `.rz`, `gz` `.gem` |
| Debian | `.deb`, `.xz`, `.gz` |
| Yum | `.rpm` |
| Alpine | `.apk` |
| Docker | `.json` |

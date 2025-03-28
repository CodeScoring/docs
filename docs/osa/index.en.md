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
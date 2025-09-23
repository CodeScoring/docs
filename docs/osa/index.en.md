---
hide:
  - footer
---

# CodeScoring.OSA

The CodeScoring.OSA module provides supply chain protection through a set of integration components that work together to automatically scan downloaded artifacts and block unwanted packages. CodeScoring.OSA includes both repository manager plugins and a proxy service — all components operate in sync and complement each other:

- plugins are integrated into the *request|response* processing of repository managers (e.g., Sonatype Nexus and JFrog Artifactory), blocking the download of unwanted components at the storage level;
- the proxy service intercepts package manager requests to remote repositories, performs scanning, and, if necessary, modifies responses — a convenient option for centralized control or when installing a plugin is not possible.

**Integration options:**

- [Sonatype Nexus Repository](/osa/nexus_osa.en) — plugin for Nexus (integrated into the repository’s request|response pipeline);
- [JFrog Artifactory](/osa/jfrog_osa.en) — plugin for Artifactory (similar integration);
- [OSA Proxy](/osa-proxy/index.en) — proxy service that intercepts package manager requests to upstream repositories, performs automatic scanning, modifies responses, and manages component access according to security policies.

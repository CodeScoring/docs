---
hide:
- footer
---

# Integration stages

The **CodeScoring** secure development platform integrates into the software development lifecycle, providing security control, policy compliance, and quality analysis at each key stage:

- local development;
- source code storage;
- software product assembly;
- post-release support.

The general integration scheme is presented below:

![Integration stages](/assets/img/integration/integration-stages-en.png)

**Important**: the main platform functionality is listed by stages. The full list of capabilities is available on the [functional characteristics](/functionality.en) page.

## Local development

![OSA](/assets/img/integration/integration-osa-en.png)

During local development, CodeScoring helps prevent vulnerable or malicious components from getting into the codebase, as well as perform composition analysis and search for secrets using the CLI agent [Johnny](/agent/index.en).

Functionality:

- analysis and blocking of open source components during installation from proxy repositories;
- inventory and registration of component requests;
- composition analysis;
- [search for confidential information](/secrets/index.en) in the source code.

To implement blocking of components, the [CodeScoring OSA](/osa/index.en) plugins for **Nexus Repository Manager** and **JFrog Artifactory PRO** are provided.

## Source code storage

During the stage of storing and managing the source code, CodeScoring allows for continuous quality control and security of repositories.

Integration with major development platforms using git is supported: **GitFlic**, **GitHub**, **GitLab**, **Bitbucket**, **Azure DevOps**, etc.

Functionality:

- inventory of third-party components in repositories;
- detection of vulnerabilities and potentially dangerous components;
- search for secrets;
- analysis of [development quality](/tqi/index.en).

## Assembly in CI/CD pipeline

![CI](/assets/img/integration/integration-ci-en.png)

At the assembly stage, CodeScoring provides software analysis in the CI/CD pipeline and checks the artifacts used.

Supported automation tools: **GitLab CI/CD**, **Jenkins**, **Bitbucket Pipelines**, **TeamCity**, **Bamboo**, **GitFlic** and others.

Functionality:

- automatic generation of a software bill of materials (SBoM);
- detection of vulnerabilities and potentially dangerous components;
- analysis of license compatibility;
- control of the build's compliance with security policies.

The analysis is performed using the [Johnny](/agent/index.en) agent, available as a binary file or container image. If security policies are violated, the agent terminates execution with the corresponding error code, which allows to stop the build before the unsafe artifact gets into the release.

## Post-release monitoring

![VCS](/assets/img/integration/integration-vcs-en.png)

After the product is published, CodeScoring provides continuous monitoring of the source code security and the composition of components. This allows to promptly respond to new vulnerabilities and threats in already released versions.

Functionality:

- periodic scanning of source code and SBoM;
- automatic updates of threat data;
- notifications via email, task trackers and integration with **ASPM/SIEM**-systems.
---
hide:
- footer
---

# Integration stages

The **CodeScoring** secure development platform is integrated into the development lifecycle at all stages of software product creation:

- Local development stage;
- Source code storage stage;
- Software product assembly stage;
- Post-release maintenance stage.

The general diagram of controlled software development stages is presented below:

![Integration stages](/assets/img/integration/integration-stages-en.png)

## Local development

![OSA](/assets/img/integration/integration-osa-en.png)

As part of local development, CodeScoring provides [search for confidential information](/secrets/index.en) (secrets) in the source code, as well as analysis of third-party components at the time of downloading from a proxy repository (intermediate storage of software components).

CodeScoring provides integration with **Nexus Repository Manager** systems from Sonatype and **JFrog Artifactory PRO** from JFrog using special [**CodeScoring OSA**](/osa/index.en) plugins. The task of the plugins is to check for compliance with configured security policies and, in case of non-compliance, block the component's download. This approach allows to prevent appearance of new vulnerable components in artifact repositories and remove existing packages if vulnerabilities are detected in them.

## Source сode storage

CodeScoring supports integration with major code storage and versioning systems that use git: **GitFlic**, **Github**, **Gitlab**, **Bitbucket**, **Azure DevOps** and others.

Interaction with these systems is carried out via API. By studying the data in the product source code, CodeScoring performs composition analysis of third-party components for threats, as well as searches for confidential information in the source code and forms a profile on [development quality](/tqi/index.en).

## Build

![CI](/assets/img/integration/integration-ci.png)

CodeScoring provides software inventory and verification at the build stage in popular continuous integration and deployment tools, such as **Gitlab CI/CD**, **Jenkins**, **Bitbucket Pipelines**, **TeamCity**, **Bamboo**, **GitFLic**.

At this stage of the components used, a list of software components (**Software Bill of Materials**) is generated, known threats are identified, and the license compatibility of the components is determined.

As part of the assembly stage, the CodeScoring system uses the binary agent [Johnny](/agent/index.en) in the form of a binary file or container image. The agent checks the components for compliance with the configured security policies and, in case of non-compliance with the policies with a blocking status, returns the corresponding error code, which signals the termination of the assembly.

## Post-release monitoring

![VCS](/assets/img/integration/integration-vcs.png)

To track the security of the source code after release, CodeScoring has a continuous risk monitoring mechanism. The platform checks the source code and the generated list of software components according to a customizable scanning schedule and signals any detected problems to the specialist’s email, task manager or **ASPM/SIEM** system.
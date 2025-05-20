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

Proxy repositories are usually located within the organization's secure environment and provide caching processes for software libraries used by developers. Additionally, these repositories can be used to store custom versions of assemblies and modules that make up the organization's software products. The leaders in this class of solutions are systems such as **Nexus Repository Manager** from Sonatype and **JFrog Artifactory PRO** from JFrog.

CodeScoring provides integration with both of these systems using special [**CodeScoring OSA**](/osa/index.en) plugins. The task of the plugins is to check for compliance with configured security policies and, in case of non-compliance, block the component (with an option to completely remove it from the repository). This approach prevents the appearance of new vulnerable components in artifact repositories, as well as removes existing packages if vulnerabilities are detected in them.

## Source сode storage

Modern projects use version control systems (VCS) as a central element of team development and change control. At this stage, it is important not only to monitor the quality of the code and leaks of sensitive information, but also to control the flow of vulnerable components into the repository.

CodeScoring supports integration with the main storage and version control systems (VCS): **GitFlic**, **Github**, **Gitlab**, **Bitbucket** and **Azure DevOps**.

Interaction with these systems is carried out via API. By studying the data in the product source code, CodeScoring performs composition analysis of third-party components for threats, as well as searches for confidential information in the source code and forms a profile on [development quality](/tqi/index.en).

## Build

![CI](/assets/img/integration/integration-ci.png)

To assemble software products, developers use automation tools such as **Gitlab CI/CD**, **Jenkins**, **Bitbucket Pipelines**. The purpose of such tools is to ensure the assembly of a software product from available artifacts consisting of proprietary code and third-party components.

CodeScoring provides inventory and verification of software at the assembly stage with the formation of a list of used components **Software Bill of Materials**, identification of known vulnerabilities and determination of the license compatibility of components.

As part of the assembly stage, the CodeScoring system uses the binary agent [Johnny](/agent/index.en) in the form of a binary file or container image. The agent checks the components for compliance with the configured security policies and, in case of non-compliance with the policies with a blocking status, returns the corresponding error code, which signals the termination of the assembly.

## Post-release monitoring

![VCS](/assets/img/integration/integration-vcs.png)

Security monitoring does not end after a release: components continue to become obsolete, new vulnerabilities appear, and licensing terms may change. Therefore, post-release monitoring is a critical part of the security lifecycle.

To track the security of the source code, CodeScoring has a continuous risk monitoring mechanism. The platform checks the source code and the generated list of software components according to a customizable scanning schedule and signals any detected problems to the specialist’s email, task manager or **ASPM/SIEM** system.
---
hide:
  - footer
---

# Policy management

## Overview

**Policy** in the CodeScoring system is a mechanism for tracking and blocking Open Source components in the software development process. They can be related to security checks, license compatibility, or other criteria for including third-party components in development.

Policies can be configured for:

- an entire organization;
- a business unit;
- a project;
- a development environment;
- a repository;
- a type of component.

The policy mechanism takes into account the specified stage of software development: from the download of third-party components to tracking builds and writing new code.

Policies are configured by conditions combined by the logical expressions **AND/OR**. In addition to standard security policy settings by vulnerability criticality level, conditions can be configured according to component information: release date, license, author, and others. A total of **40 conditions** are supported. The checks also include a built-in vendor-specific license compatibility policy.

When a policy is triggered, the CodeScoring system creates corresponding **Policy Alerts**. Selected alerts can be temporarily or permanently ignored. Alerts can be exported as a report.

Policies can be **blocking**: when such a policy is triggered, the used components are blocked in the artifact repository (proxy repositories) or the software build is stopped until the detected defect is fixed.

Additionally, when the policy is triggered, a notification can be sent to the responsible specialists in the task management system or an email with a description of the problem.

## Policy stages

The stages of policy operation are configured by the user when editing the project parameters in the **Settings → Projects** section in the **Policy stage** field or specified via the `--stage` parameter when launching the [Johnny console agent](/agent/scan.en). The names of the stages correspond to the following logic:

- `dev` – development stage;
- `stage` – intermediate (pre-production) stage;
- `test` – testing stage;
- `prod` – production stage.

When creating or editing a policy in the **Settings → Policies** section, the user has to specify the stages to which it will be applied.

In addition, there are special stage values used for certain tasks:

- `proxy` – for the plugin in the OSA module;
- `source` – for VCS project analysis;
- `build` – for the Johnny console agent.

## Customization in the system

Policies are created in the `Settings -> Policies` section. You can go to the policy creation form by clicking the **Create new** button.

In the form of policy creation the context of policy operation is set by the following parameters:

- **Name** - name of the policy;
- **Groups** — group to which the policy applies, if empty - the policy applies to the whole organization;
- **Proprietors** - owner of the code to which the policy applies, if empty - the policy applies to the whole organization;
- **Projects** - projects to which the policy applies;
- **Stages** - project stages for which the policy is applied;
- **OSA Components** - type of components in OSA plugins for which the policy is applied (**Packages** or **Container images**).
- **Repositories** - list of repositories for which the policy applies;
- **Level** - criticality level of the policy;
- **Blocker** - an indication of blocking a build or installation of a component from a proxy repository;
- **Is active** - an indication that the policy is temporarily disabled;
- **Description** - description of the policy;
- **Conditions** - list of conditions in the policy.

Next, the policy triggering conditions are configured, the following parameters are supported:

- **PURL** - [package URL](https://github.com/package-url/purl-spec), package identifier;
- **Dependency Name** - name of the dependency;
- **Dependency Version** - dependency version;
- **Dependency Author** - author of the dependency;
- **Dependency Release Date** - release date of the dependency version;
- **Dependency Age** - age of the dependency;
- **Dependency Vulnerability Count** - number of vulnerabilities in the dependency;
- **Dependency is dangerous** - dependency is dangerous;
- **Technology** - technology (language or ecosystem);
- **License** - license;
- **License Category** - license category;
- **Vulnerability ID** - vulnerability identifier;
- **CVSS2 Score** - CVSS 2 threat score;
- **CVSS2 Severity** - CVSS 2 threat level;
- **CVSS2 Access Vector (AV)** - vulnerability exploitation path (physical or network);
- **CVSS2 Access Complexity (AC)** - complexity of vulnerability exploitation;
- **CVSS2 Authentication (Au)** - authentication requirements for vulnerability exploitation;
- **CVSS2 Availability Impact (A)** - degree of data availability loss;
- **CVSS2 Confidentiality Impact (C)** - extent of loss of data confidentiality;
- **CVSS2 Integrity Impact (I)** - degree of loss of data integrity;
- **CVSS3 Score** - CVSS 3 threat score;
- **CVSS3 Severity** - CVSS 3 threat level;
- **CVSS3 Attack Vector (AV)** - attack vector;
- **CVSS3 Attack Complexity (AC)** - attack complexity;
- **CVSS3 Priviliges Required (PR)** - the required level of access to exploit the vulnerability;
- **CVSS3 User Interaction (UI)** - presence of user interaction;
- **CVSS3 Scope (S)** - the security scope of the component;
- **CVSS3 Confidentiality (C)** - degree of loss of data confidentiality;
- **CVSS3 Integrity (I)** - degree of loss of data integrity;
- **CVSS3 Availability (A)** - degree of loss of data availability;
- **Vulnerability Publish Date** - vulnerability publication date;
- **Vulnerability Update Date** - vulnerability update date;
- **Vulnerability has exploit** - presence of an exploit in the vulnerability;
- **Vulnerability impacts (Kaspersky)** - scope of the vulnerability;
- **Vulnerability has fixed version** - vulnerability has been fixed in a new version;
- **Vulnerability Age (days)** - age of the vulnerability
- **Env** - environment;
- **Match type** - dependency match type (by manifest, content or resolution);
- **Relation** - direct or transitive dependency;
- **CWE** - classification in the Common Weakness Enumeration index.

Policy conditions (**Rules**) can be grouped into groups using **AND/OR** logical expressions. Groups have no restrictions on the level of nesting or the number of conditions.

For example, you can set policy conditions for the following scenario - either the dependency contains a vulnerability with an exploit and a remediation recommendation, or the dependency is directive and contains a critical vulnerability according to CVSS 3 standard.

To create such a policy, you need to add two groups joined by the expression **OR**. This means that the policy will be triggered if any of the listed groups of conditions are met. Within a group, the conditions combined by the expression **AND** are specified.

![Policy example](/assets/img/policy_example.png)

The policy becomes active immediately after creation by clicking the **Create** button. For a created policy, you can customize actions when the policy is triggered: [email notification](/on-premise/how-to/notifications.en/#email) or [task creation in Jira](/on-premise/how-to/notifications.en/#jira).

**Important!** Policies are triggered during analysis, so it is important to create them before running the analysis.

**Recommendation!** If you leave the `Proprietors`, `Groups` and `Projects` fields empty, the policy will be applied to all active projects in the system.

## Policy results

Policy results are displayed in the `Policy alerts` section. The section has three tabs:

- **Active** - list of triggered policy alerts based on the results of the last analysis (of a project, image or component in the proxy repository);
- **Ignored** - list of ignored policies;
- **Resolved** - list of notifications that were resolved after the last analysis (the policy condition is no longer relevant).

The reason for triggering the policy is displayed in the **Matched criteria** field, including the conditions set and the component data found. For example, a value of `django@4.2.2 has CVE-2024-38875, CVSS3 Score 7.5 >= 7.00` implies that a policy to block components with a CVSS 3 equal to or greater than 7.00 was triggered on the component django@4.2.2 with the vulnerability rating of 7.5.

## Ignore Policies

Created policies can be temporarily or permanently ignored during analysis. The ignore condition allows you to leave the policy in the system without receiving notifications about its triggering, for example, if the vulnerability cannot be fixed quickly. Creating and configuring ignore conditions is done in the `Settings -> Policy Ignores` section.

To create an ignore condition for one or several policies, you should click the **Create New** button and fill in the following fields:

- **Project** - name of the project in the system;
- **Technology** - technology (language or ecosystem);
- **Dependency name** - dependency name;
- **Dependency version** - dependency version;
- **License** - license;
- **Vulnerability ID** - vulnerability identifier;
- **Policies** - ignored policies;
- **Is enabled** - condition activity sign;
- **Active from** - start date of the condition;
- **Active to** - date of termination of the condition;
- **Note** - note.

---
hide:
- footer
---

# Ignoring policies

Triggered policies can be temporarily or permanently ignored during analysis. The ignore condition will allow you to leave policies in the system without receiving alerts about their triggering, for example, if a vulnerability in a component is not applicable to a specific project.

## Creating ignores

Ignore conditions are created and configured in the `Settings -> Policy ignores` section.

To create an ignore condition for one or more policies, click the **Create** button and fill in the following fields:

- **Groups** - project groups to which the ignore is applied;
- **Projects** - projects to which the ignore is applied;
- **Container images** - images in registries to which the ignore is applied;
- **Technology** - programming language or ecosystem;
- **Dependency PURL** — [package URL](https://github.com/package-url/purl-spec), component identifier;
- **Dependency name**;
- **Dependency version**;
- **License**;
- **Vulnerability ID** - vulnerability identifier;
- **Policies**;
- **Active** - ignore state;
- **Activation date** - date from which the ignore will start working;
- **End date** - date after which the ignore will stop working;
- **Note**.

!!! warning "Ignore by partial match"
    Alert ignore based on PURL uses partial matching semantics: if a specified PURL omits any components, the match is treated as positive.

    For example: alert with dependency PURL `pkg:conda/setuptools@65.1.0?build=py310h2ec42d9_0&channel=conda-forge&subdir=osx-64&type=tar.bz2` would be ignored by specified ignore PURL `pkg:conda/setuptools@65.1.0`.

    However, the dependency PURL will not be treated as a match for `pkg:conda/setuptools@65.1.0?subdir=foo`, as the `subdir` qualifier differs.

![Ignore example](/assets/img/ignore-en.png)

## Ignore results

The policies that were subject to the ignore condition are displayed on the "Ignored" tab of the `Alerts` section.

Triggered active policies can also be quickly ignored from the "Active" tab using the **Ignore** button.

!!! Warning Access
    The user can only view the ignores that are related to the projects available to him.

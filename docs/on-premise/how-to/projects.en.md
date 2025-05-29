---
hide:
- footer
---

# Managing projects

A project in CodeScoring is a part of the analyzed code base. It is possible to create two types of projects in the system:

- **VCS project** – linked to a repository in the version control system;
- **CLI project** – not linked to a repository and allows you to save scanning results from the johnny console agent or download a ready-made SBoM file.

Projects are managed in the `Settings->Projects` section.

## Creating a VCS project

**Important!** You can create a VCS project only after creating a [connection to the version control system](/on-premise/how-to/vcs-git.en).

To go to the VCS project creation form, click the **Create** button and select the **VCS projects** tab. The project type selected during creation cannot be converted to another.

![VCS Project](/assets/img/vcs-project-en.png)

1. To add a project, you need to add a link to the repository in the form, select the appropriate version control system from the list, set the project name and the option to run SCA analysis immediately after cloning.
2. After adding, the initial cloning of the project occurs, the time of which will depend on the size of the repository.
3. After cloning, the project will be available for editing and new analyses.

The system accepts links to repositories in the following formats:

- GitLab
    + `<http/https>://<GitLab Server URL>/<group>/<project`
- GitHub
    + `https://github.com/<ursername/organisation>/<project>`
- BitBucket
    + `<http/https>://<Bitbucket Server URL>/scm/<group>/<project>`
- Azure DevOps Git
    + `https://<organisation>.visualstudio.com/<group>/_git/<project>`
    + `https://dev.azure.com/<organisation>/<group>/_git/<project>`
    + `<http/https>://<Azure Server URL>/<organisation>/<group>/_git/<project>`

After adding a repository, manual update of the project code is available on the VCS project settings page by clicking the button **Update project code**.

**Attention!** If the analyzed project is commercial, it is recommended to specify the **Commercial License** license category for it to ensure that license compatibility policy works correctly.

## Creating a CLI project

To go to the CLI project creation form, click the **Create new** button and select the CLI Projects tab.

To add a project, simply fill in its name in the **Name** field.

## Creating project categories

Categories are used to group system projects by semantic groups.

Categories are managed in the `Settings -> Categories` section. You can go to the category creation form by clicking the **Create** button. To create a category, simply give it a name.

## Working with SBoM within a project

After analyzing the project, you can download the resulting list of used components (SBoM) in CycloneDX format.

You can download the resulting SBoM on the project page in the `Projects` section by clicking the **Export SBoM** button.

SBoM export is supported in the following formats:

- [CycloneDX v1.4 JSON](https://cyclonedx.org/docs/1.4/json/);
- [CycloneDX v1.5 JSON](https://cyclonedx.org/docs/1.5/json/);
- [CycloneDX v1.6 JSON](https://cyclonedx.org/docs/1.6/json/);
- CycloneDX v1.6 Ext JSON -- extended CycloneDX format containing additional component properties: `GOST:attack_surface`, `GOST:security_function`, `GOST:source_lang`.

You can configure the properties of components during export on the [project dependency settings page](/on-premise/how-to/export-results.en/#bom-settings).

For CLI projects, you can also download SBoM via the interface by clicking the **Import SBoM** button. The downloaded SBoM must be in CycloneDX format and have the `.json` extension.

## Generating a PDF report for the project

After the analysis, you can also generate a PDF report with summary information for the project.

You can export a PDF report with the latest analysis data on the project page by clicking the **Export PDF** button. You can export an analysis report for a specific date on the `SCA Scan History` page.

The resulting report contains the following data:

- General information on the project (name, VCS branch, time of the last analysis, commit hash);
- Distribution of vulnerabilities by CVSS;
- Distribution of vulnerabilities by technology;
- Table of found dependencies with division by technology and development environment;
- Table of found vulnerabilities with division by technology and development environment.
---
hide:
  - footer
---
# Managing projects

A project in CodeScoring is a part of the analyzed codebase. Two types of projects can be created in the system:

- **VCS-project** - equivalent to a repository in a version control system.
- **CLI-project** - has no binding to a repository and allows you to save scanning results from the Johnny console agent or upload a SBoM file.

Projects are managed under `Settings->Projects`.

## Create a VCS project

**Important!** You can create a VCS project only after creating a [version control system connection](/on-premise/how-to/vcs-git.en).

To go to the form of VCS-project creation you should click on the **Create new** button and select the **VCS Projects** tab. The project type selected during creation cannot be converted to another one.

1. To add a project, add a link to the repository in the form and select the corresponding version control system from the list.
2. After adding, the project is initially cloned, the time of which will depend on the size of the repository.
3. Once cloned, the project will be available for editing and will be able to participate in the analysis.
4. The first SCA analysis will start automatically as soon as the project is cloned.

The system accepts repository references in the following formats:

- GitLab
    + `<http/https>://<GitLab Server URL>/<group>/<project`
- GitHub
    + `https://github.com/<ursername/organization>/<project>`
- BitBucket
    + `<http/https>://<Bitbucket Server URL>/scm/<group>/<project>`
- Azure DevOps Git
    + `https://<organization>.visualstudio.com/<group>/_git/<project>`
    + `https://dev.azure.com/<organization>/<group>/_git/<project>`
    + `<http/https>://<Azure Server URL>/<organization>/<group>/_git/<project>`

After adding the repository, manual updating of the project code is available on the VCS project settings page via the **Refresh project code** button.

**Please note!** If the project being analyzed is a commercial project, it is recommended to specify a Commercial License for it. 

## Creating a CLI project

To go to the form of creating a CLI project, click on the **Create new** button and select the CLI Projects tab.

To add a project, just fill in its name in the **Name** field.

## Create project categories

Categories are used to group the system projects into semantic groups.

Categories are managed in the `Settings -> Categories` section. You can go to the form of category creation by pressing the **Create new** button. To create a category it is enough to give it a name.

## Working with SBOM within a project

After the project has been analyzed, the resulting list of used components (SBOM) can be exported in CycloneDX format.

You can export the resulting SBOM on the project page in the `Projects` section using the **Export SBOM** button.

Export SBoM is supported in the following formats:

- [CycloneDX v1.4 JSON](https://cyclonedx.org/docs/1.4/json/)
- [CycloneDX v1.5 JSON](https://cyclonedx.org/docs/1.5/json/)
- [CycloneDX v1.6 JSON](https://cyclonedx.org/docs/1.6/json/)
- CycloneDX v1.6 Ext JSON -- an extended CycloneDX format containing additional properties for components: `GOST:attack_surface`, `GOST:security_function`, `GOST:source_lang`.

For CLI projects it is also possible to load SBOM through the interface by clicking the **Import SBOM** button. The SBOM to be uploaded must be in CycloneDX format and have a `.json` extension.

You can configure component fields for export on the [project dependency settings page](on-premise/how-to/export-results.en/#bom-settings).


## PDF report generation

Once the analysis has been performed, a PDF report with project summary information is also available.

You can export a PDF report with the latest analysis data on the project page by clicking the **Export PDF** button. You can export the analysis report for a specific date on the `SCA Scan History` page.

The resulting report contains the following data:

- General information on the project (name, VCS branch, time of the last analysis, commit hash);
- Distribution of vulnerabilities by CVSS;
- Distribution of vulnerabilities by technology;
- List of found dependencies with division by technologies and development environment;
- List of found vulnerabilities by technology and development environment.

- [Русский](https://docs.codescoring.ru/on-premise/how-to/projects/index.md)

# Managing projects

A project in CodeScoring is a part of the analyzed code base. It is possible to create two types of projects in the system:

- **VCS project** – linked to a repository in the version control system;
- **CLI project** – not linked to a repository and allows you to save scanning results from the johnny console agent or download a ready-made SBOM file.

Projects are managed in the `Settings->Projects` section.

## Creating a VCS project

**Important!** You can create a VCS project only after creating a [connection to the version control system](/on-premise/how-to/vcs-git.en).

To go to the VCS project creation form, click the **Create** button and select the **VCS projects** tab. The project type selected during creation cannot be converted to another.

1. To add a project, you need to add a link to the repository in the form, select the appropriate version control system from the list, set the project name and the option to run SCA analysis immediately after cloning.
1. After adding, the initial cloning of the project occurs, the time of which will depend on the size of the repository.
1. After cloning, the project will be available for editing and new analyses.

The system accepts links to repositories in the following formats:

- GitLab
  - `<http/https>://<GitLab Server URL>/<group>/<project`
- GitHub
  - `https://github.com/<ursername/organisation>/<project>`
- BitBucket
  - `<http/https>://<Bitbucket Server URL>/scm/<group>/<project>`
- Azure DevOps Git
  - `https://<organisation>.visualstudio.com/<group>/_git/<project>`
  - `https://dev.azure.com/<organisation>/<group>/_git/<project>`
  - `<http/https>://<Azure Server URL>/<organisation>/<group>/_git/<project>`

After adding a repository, manual update of the project code is available on the VCS project settings page by clicking the button **Update project code**.

**Attention!** If the analyzed project is commercial, it is recommended to specify the **Commercial License** license category for it to ensure that license compatibility policy works correctly.

## Creating a CLI project

To go to the CLI project creation form, click the **Create new** button and select the CLI Projects tab.

To add a project, simply fill in its name in the **Name** field.

## Creating project categories

Categories are used to group system projects by semantic groups.

Categories are managed in the `Settings -> Categories` section. You can go to the category creation form by clicking the **Create** button. To create a category, simply give it a name.

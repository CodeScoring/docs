- [Русский](https://docs.codescoring.ru/on-premise/how-to/users/index.md)

# Managing user accounts

## Creating accounts

The CodeScoring platform supports multiple users with separate accounts. User accounts are created and managed in the `Settings -> Users` section.

To create a new user, go to the form by clicking the **Create New** button and fill in the following fields:

- **Username** — username in the system;
- **First name** — first name;
- **Last name** — last name;
- **Contact email** — email;
- **Proprietor** — affiliation with the organization's department within the system;
- **Access level** — access level within the system;
- **Password** — password for logging into the system;
- **Can create CLI projects via API** – ability to create CLI type projects using API.

The list of created users can be filtered by the following parameters:

- **Proprietor**;
- **Access level**;
- **Active** — an active account;
- **LDAP server** — [LDAP server](/on-premise/how-to/ldap-settings.en/) connected to the system.

## Editing account settings

Created accounts can be edited or deleted in the `Settings -> Users` section. You can add a user to a project with the specified role by clicking the **Add users** button on the "Projects" tab of the user editing page.

The session time for an inactive user is limited. By default, a user's session ends 2 weeks after the last activity, after which you must log in to the system again.

The environment variable (in seconds) `SESSION_COOKIE_AGE` is available for configuring the session lifetime.

Important

```
Modifying `username` or `password` of users from external identity providers is prohibited.
```

## Separation of access levels

When creating an account, it must be assigned one of the following access levels - **User**, **Administrator**, **Auditor** or **Security Manager**.

### Administrator access level

The Administrator access level provides access to all projects. This access level also allows to view and change all settings in the system without restrictions.

### Security Manager access level

The Security Manager access level provides access to all projects. This access level also allows you to view all security-related sections, but only change policies.

### Auditor access level

The Auditor access level provides access to all projects. This access level also allows to view all settings and projects in the system without the ability to make and save changes.

### User access level

For the User access level, access is organized individually. For each project, access can be provided with the following roles:

- **Viewer** — access only to view analysis results within the project;
- **Developer** — all rights of the Viewer role, as well as access to launching analysis in the web interface, via the agent and via the proxy repository plugin;
- **Owner** — all rights of the Developer role, access to changing project settings and managing access of other project users.

For each role within the **User** access level, CLI project creation via API is available when the **Can create CLI projects via API** parameter is activated in the user profile.

A project can have multiple users with the same roles, including multiple **Owner**. If there are no users in the **Owner** role, only a user with the **Administrator** access level can manage the project.

## Available actions

A more detailed list of available actions for each access level is presented in the table below:

| **Action**                                                       | **User (Viewer)** | **User (Developer)** | **User (Owner)** | **Auditor** | **Security Manager** | **Administrator** |
| ---------------------------------------------------------------- | ----------------- | -------------------- | ---------------- | ----------- | -------------------- | ----------------- |
| **Analysis**: Viewing the analysis results                       |                   |                      |                  |             |                      |                   |
| **Analysis**: launching SCA analysis                             |                   |                      |                  |             |                      |                   |
| **Analysis**: launching Secrets analysis                         |                   |                      |                  |             |                      |                   |
| **Analysis**: set Secrets status                                 |                   |                      |                  |             |                      |                   |
| **Analysis**: launching Authors analysis                         |                   |                      |                  |             |                      |                   |
| **Analysis**: launching Quality analysis                         |                   |                      |                  |             |                      |                   |
| **Activation key**: viewing information about the activation key |                   |                      |                  |             |                      |                   |
| **Activation key**: saving the activation key                    |                   |                      |                  |             |                      |                   |
| **Audit log**: view audit log                                    |                   |                      |                  |             |                      |                   |
| **Audit log**: export audit log                                  |                   |                      |                  |             |                      |                   |
| **Authors merge**: view rules                                    |                   |                      |                  |             |                      |                   |
| **Authors merge**: creating rules                                |                   |                      |                  |             |                      |                   |
| **Dashboard**: viewing the page                                  |                   |                      |                  |             |                      |                   |
| **Dependencies**: viewing list of dependencies                   |                   |                      |                  |             |                      |                   |
| **Dependencies**: export list of dependencies                    |                   |                      |                  |             |                      |                   |
| **Email**: viewing email settings                                |                   |                      |                  |             |                      |                   |
| **Email**: editing email settings                                |                   |                      |                  |             |                      |                   |
| **Groups**: viewing user groups                                  |                   |                      |                  |             |                      |                   |
| **Groups**: creating user groups                                 |                   |                      |                  |             |                      |                   |
| **Groups**: editing user groups                                  |                   |                      |                  |             |                      |                   |
| **Groups**: deleting user groups                                 |                   |                      |                  |             |                      |                   |
| **LDAP**: viewing LDAP settings                                  |                   |                      |                  |             |                      |                   |
| **LDAP**: editing LDAP settings                                  |                   |                      |                  |             |                      |                   |
| **OSS Index**: viewing OSS Index settings                        |                   |                      |                  |             |                      |                   |
| **OSS Index**: editing OSS Index settings                        |                   |                      |                  |             |                      |                   |
| **Policies**: viewing policies                                   |                   |                      |                  |             |                      |                   |
| **Policies**: creating policies                                  |                   |                      |                  |             |                      |                   |
| **Policies**: editing policy settings                            |                   |                      |                  |             |                      |                   |
| **Policies**: delete policies                                    |                   |                      |                  |             |                      |                   |
| **Policy alerts**: view list of alerts                           |                   |                      |                  |             |                      |                   |
| **Policy alerts**: export list of alerts                         |                   |                      |                  |             |                      |                   |
| **Policy alerts**: send notifications                            |                   |                      |                  |             |                      |                   |
| **Policy ignores**: view rules                                   |                   |                      |                  |             |                      |                   |
| **Policy ignores**: creating rules                               |                   |                      |                  |             |                      |                   |
| **Policy ignores**: editing rules                                |                   |                      |                  |             |                      |                   |
| **Policy ignores**: removing rules                               |                   |                      |                  |             |                      |                   |
| **Projects**: viewing projects                                   |                   |                      |                  |             |                      |                   |
| **Projects**: viewing Contribution map                           |                   |                      |                  |             |                      |                   |
| **Projects**: viewing Complexity map                             |                   |                      |                  |             |                      |                   |
| **Projects**: creating projects                                  |                   |                      |                  |             |                      |                   |
| **Projects**: editing project settings                           |                   |                      |                  |             |                      |                   |
| **Projects**: deleting projects                                  |                   |                      |                  |             |                      |                   |
| **Projects**: managing group permissions for projects            |                   |                      |                  |             |                      |                   |
| **Projects**: managing user permissions for projects             |                   |                      |                  |             |                      |                   |
| **Projects**: SBOM upload                                        |                   |                      |                  |             |                      |                   |
| **Projects**: editing dependencies for SBOM export               |                   |                      |                  |             |                      |                   |
| **Project categories**: view categories                          |                   |                      |                  |             |                      |                   |
| **Project categories**: creating categories                      |                   |                      |                  |             |                      |                   |
| **Project categories**: editing categories                       |                   |                      |                  |             |                      |                   |
| **Project categories**: removing categories                      |                   |                      |                  |             |                      |                   |
| **Proprietors**: viewing code owners                             |                   |                      |                  |             |                      |                   |
| **Proprietors**: creating code owners                            |                   |                      |                  |             |                      |                   |
| **Proprietors**: editing code owners                             |                   |                      |                  |             |                      |                   |
| **Proprietors**: removing code owners                            |                   |                      |                  |             |                      |                   |
| **Task managers**: view integrations                             |                   |                      |                  |             |                      |                   |
| **Task managers**: adding integrations                           |                   |                      |                  |             |                      |                   |
| **Task managers**: editing integration settings                  |                   |                      |                  |             |                      |                   |
| **Task managers**: removing integrations                         |                   |                      |                  |             |                      |                   |
| **Task managers**: performing configuration checks               |                   |                      |                  |             |                      |                   |
| **Users**: viewing users                                         |                   |                      |                  |             |                      |                   |
| **Users**: creating users                                        |                   |                      |                  |             |                      |                   |
| **Users**: editing user settings                                 |                   |                      |                  |             |                      |                   |
| **Users**: deleting users                                        |                   |                      |                  |             |                      |                   |
| **VCS**: browsing list of repositories                           |                   |                      |                  |             |                      |                   |
| **VCS**: adding repositories                                     |                   |                      |                  |             |                      |                   |
| **VCS**: editing repository settings                             |                   |                      |                  |             |                      |                   |
| **VCS**: deleting repositories                                   |                   |                      |                  |             |                      |                   |
| **VCS**: performing settings check                               |                   |                      |                  |             |                      |                   |
| **Vulnerabilities**: viewing a list of vulnerabilities           |                   |                      |                  |             |                      |                   |
| **Vulnerabilities**: export list of vulnerabilities              |                   |                      |                  |             |                      |                   |

Important

To be able to run a scan, also make sure that the appropriate analysis module is included in the license.

## User groups

Users within the system can be divided into groups. Groups are created and managed in the `Settings -> Groups` section.

To create a new user group, you must go to the form using the **Create New** button and fill in the following fields:

- **Name** — group name;
- **Description** — group description.

Groups can be added to created projects to more easily track users associated with a project.

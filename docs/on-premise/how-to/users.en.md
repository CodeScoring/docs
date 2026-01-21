---
hide:
- footer
---

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

!!! warning "Important"

        Modifying `username` or `password` of users from external identity providers is prohibited.

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

| **Action**                                                          | **User (Viewer)**                              | **User (Developer)**                           | **User (Owner)**                               | **Auditor**                                    | **Security Manager**                           | **Administrator**                              |
|---------------------------------------------------------------------|------------------------------------------------|------------------------------------------------|------------------------------------------------|------------------------------------------------|------------------------------------------------|------------------------------------------------|
| **Analysis**: Viewing the analysis results                          | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Analysis**: launching SCA analysis                                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Analysis**: launching Secrets analysis                            | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Analysis**: set Secrets status                                    | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Analysis**: launching Authors analysis                            | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Analysis**: launching Quality analysis                            | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Activation key**: viewing information about the activation key    | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Activation key**: saving the activation key                       | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Audit log**: view audit log                                       | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Audit log**: export audit log                                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Authors merge**: view rules                                       | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Authors merge**: creating rules                                   | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Dashboard**: viewing the page                                     | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Dependencies**: viewing list of dependencies                      | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Dependencies**: export list of dependencies                       | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Email**: viewing email settings                                   | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Email**: editing email settings                                   | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Groups**: viewing user groups                                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Groups**: creating user groups                                    | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Groups**: editing user groups                                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Groups**: deleting user groups                                    | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **LDAP**: viewing LDAP settings                                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **LDAP**: editing LDAP settings                                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **OSS Index**: viewing OSS Index settings                           | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **OSS Index**: editing OSS Index settings                           | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Policies**: viewing policies                                      | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policies**: creating policies                                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policies**: editing policy settings                               | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policies**: delete policies                                       | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy alerts**: view list of alerts                              | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy alerts**: export list of alerts                            | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy alerts**: send notifications | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: view rules                                      | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: creating rules                                  | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: editing rules                                   | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: removing rules                                  | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: viewing projects                                      | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: viewing Contribution map                              | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: viewing Complexity map                                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: creating projects                                     | :material-tilde:{ .icon_optional }             | :material-tilde:{ .icon_optional }             | :material-tilde:{ .icon_optional }             | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Projects**: editing project settings                              | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }  | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Projects**: deleting projects                                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Projects**: managing group permissions for projects               | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Projects**: managing user permissions for projects                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Projects**: SBOM upload                                           | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: editing dependencies for SBOM export                  | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: view categories                             | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: creating categories                         | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: editing categories                          | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: removing categories                         | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: viewing code owners                                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: creating code owners                               | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: editing code owners                                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: removing code owners                               | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: view integrations                                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: adding integrations                              | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: editing integration settings                     | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: removing integrations                            | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: performing configuration checks                  | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Users**: viewing users                                            | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Users**: creating users                                           | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Users**: editing user settings                                    | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Users**: deleting users                                           | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **VCS**: browsing list of repositories                              | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **VCS**: adding repositories                                        | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **VCS**: editing repository settings                                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **VCS**: deleting repositories                                      | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **VCS**: performing settings check                                  | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check }                | :material-check-circle-outline:{ .icon_check } |
| **Vulnerabilities**: viewing a list of vulnerabilities              | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Vulnerabilities**: export list of vulnerabilities                 | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |

!!! warning "Important"
    To be able to run a scan, also make sure that the appropriate analysis module is included in the license.

## User groups

Users within the system can be divided into groups. Groups are created and managed in the `Settings -> Groups` section.

To create a new user group, you must go to the form using the **Create New** button and fill in the following fields:

- **Name** — group name;
- **Description** — group description.

Groups can be added to created projects to more easily track users associated with a project.

---
hide:
  - footer
---

# Managing user accounts

## Creating user accounts

CodeScoring supports multiple users with separate accounts. User accounts are created and managed in the `Settings -> Users` section. 

To create a new user, go to the form using the **Create New** button and fill in the following fields:

- **Username** - user name in the system;
- **First name** - first name;
- **Last name** - last name;
- **Contact email** - e-mail;
- **Proprietor** - affiliation to a proprietor within the system;
- **Access level** - access level.

The list of created users on the `Users` tab can be filtered by the following parameters:

- **Proprietor** - proprietor;
- **Access level** - access level;
- **Is active** - sign of an active account;
- **From LDAP** - an indication of an account created via LDAP.

## Customize Accounts

Created accounts can be edited or deleted in the `Settings -> Users` section. You can add a user to a project with a specified role by clicking the **Add Project** button on the Projects tab of the user edit page.

Session time for an inactive user is limited. By default, a user's session expires in 2 weeks from the last activity, after which the user must log in again.

An environment variable is available to configure the session lifetime (in seconds): `SESSION_COOKIE_AGE`. 

## Separating access levels

When an account is created, it must be assigned one of the following access levels – **User**, **Administrator** or **Auditor**.

For the **User** access level, three roles are available within an individual project:

- **Viewer** - access only to viewing the results of analyses within the project;
- **Developer** - access to run the analysis in the UI, through the agent and through the proxy repository plugin;
- **Owner** - access to view project policies, change project settings and manage access of other project users.

For each role within the **User** access level, creation of CLI projects via API is available if the **Can create CLI projects via API**parameter is enabled in the user profile.

For **Administrator** access level it is possible to view and change all settings and projects in the system without restrictions.

For **Auditor** access level it is possible to view all settings and projects in the system without the possibility to make and save changes.

There can be several users with the same roles in a project, including several **Owner**. If there are no users in the **Owner** role, only a user with the **Administrator** access level can manage the project.

More detailed listing of available actions for each access level is presented in the table below:

| **Action** | **User (Viewer)** | **User (Developer)** | **User (Owner)** | **Auditor** | **Administrator** |
|:------------------------------------------------ --------------------|:---------------------------- ------------------:|:---------------------------- -----------------:|:------------------------------ ----------------:|:-------------------------------- ---------------:|:-------------------------------- --------------:|
| **Analysis**: launching SCA analysis | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Analysis**: launching Authors analysis | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Analysis**: launching Quality analysis | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Activation key**: viewing information about the activation key | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Activation key**: saving the activation key | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Audit log**: view audit log | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Audit log**: export audit log | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Authors merge**: view rules | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Authors merge**: creating rules | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Dashboard**: viewing the page | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Dependencies**: viewing list of dependencies | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Dependencies**: export list of dependencies | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Email**: viewing email settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Email**: editing email settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Groups**: viewing user groups | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Groups**: creating user groups | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Groups**: editing user groups | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Groups**: deleting user groups | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **LDAP**: viewing LDAP settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **LDAP**: editing LDAP settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **OSS Index**: viewing OSS Index settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **OSS Index**: editing OSS Index settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policies**: viewing policies | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policies**: creating policies | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policies**: editing policy settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policies**: delete policies | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy alerts**: view list of alerts | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy alerts**: export list of alerts | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: view rules | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: creating rules | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: editing rules | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Policy ignores**: removing rules | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: viewing projects | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: viewing Contribution map | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: viewing Complexity map | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: creating projects | :material-tilde:{ .icon_optional } | :material-tilde:{ .icon_optional } | :material-tilde:{ .icon_optional } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: editing project settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: deleting projects | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: managing group permissions for projects | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Projects**: managing user permissions for projects | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
|**Projects**: SBOM upload | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: view categories | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: creating categories | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: editing categories | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Project categories**: removing categories | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: viewing code owners | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: creating code owners | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: editing code owners | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Proprietors**: removing code owners | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: view integrations | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: adding integrations | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: editing integration settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: removing integrations | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Task managers**: performing configuration checks | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Users**: viewing users | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Users**: creating users | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Users**: editing user settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Users**: deleting users | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **VCS**: browsing list of repositories | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **VCS**: adding repositories | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **VCS**: editing repository settings | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **VCS**: deleting repositories | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **VCS**: performing settings check | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-minus:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Vulnerabilities**: viewing a list of vulnerabilities | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |
| **Vulnerabilities**: export list of vulnerabilities | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } | :material-check-circle-outline:{ .icon_check } |

## User groups

Users within the system can be divided into groups. Groups are created and managed in the `Settings->Groups` section.

To create a new user group, you must go to the form using the **Create New** button and fill in the following fields:

- **Name** — group name;
- **Description** — description.

Groups can be added to created projects to more easily track users associated with a project.

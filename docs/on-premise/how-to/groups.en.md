---
hide:
  - footer
---
# Creating groups

**Groups** are used to join [users](/on-premise/how-to/users.en) and associate them with specific projects.

Groups are managed in the `Settings -> Groups` section. You can go to the group creation form by clicking the **Create new** button. In the form, you must fill in the field **Name** and optionally specify a group description.

## Configuring groups

Each group has its own list of users and a set of associated projects. You can change these parameters on the **Edit** page.

When adding a new user to a group using the **Add user** button, you must select an existing account in the CodeScoring system and assign one of the roles within the group:

- **Viewer** - access only to viewing the results of project analyzes;
- **Developer** - access to launch analysis in the web interface, through an agent and through a proxy repository plugin;
- **Owner** - access to view project policies, change project settings and manage access of other project users.

You can link a project to a group using the **Add project** button. After linking a group, each user will have access to the project according to the assigned role.

Within the system, it is also possible to configure [mapping of LDAP groups into CodeScoring groups and roles](/on-premise/how-to/ldap-settings.en/#ldap-codescoring_1).
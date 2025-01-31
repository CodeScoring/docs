---
hide:
  - footer
---
# Connecting registry with container images

To work with Docker images, it is necessary to connect registry with images in `System -> Registries` section. 

Go to the form of creating a new connection using the **Setup new** button. The following fields should be filled in the form:

- **Name** - name of the registry;
- **Is active** - the sign of the active registry. For inactive registries the list of available images will not be updated;
- **Type** - type of repository manager (Sonatype Nexus Repository, JFrog Artifactory or other);
- **Auth type** – type of authorization (Basic or Bearer);
- **Host** - the address of the registry with the protocol. For example: `https://jfrog.example.com`;
- **Username** - user name with access to the registry;
- **Password** - password.

**Important**: when connecting GitLab Container Registry, you must select the authorization type **Bearer**.

You can test the connection after filling in the data by pressing the **Test it** button. 

After creating a new connection by the **Setup now** button, the registry will be displayed in the section list, with the possibility to view information about it (**View**), change connection parameters (**Edit**), or delete the connection (**Delete**). 

To update the list of available images, click **Update images list** on the view page. You can check the connection by clicking the **Refresh status** button.

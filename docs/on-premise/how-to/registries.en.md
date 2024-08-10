---
hide:
  - footer
---

# Working with Docker images


## Connecting registry with images

To work with Docker images, it is necessary to connect registry with images in `System -> Registries` section. 

Go to the form of creating a new connection using the **Setup new** button. The following fields should be filled in the form:

- **Name** - name of the registry;
- **Is active** - the sign of the active registry. For inactive registries the list of available images will not be updated;
- **Type** - type of repository manager (Sonatype Nexus Repository, JFrog Artifactory or other);
- **Host** - the address of the registry with the protocol. For example: `https://jfrog.example.com`;
- **Username** - user name with access to the registry;
- **Password** - password.

You can test the connection after filling in the data by pressing the **Test it** button. 

After creating a new connection by the **Setup now** button, the registry will be displayed in the section list, with the possibility to view information about it (**View**), change connection parameters (**Edit**), or delete the connection (**Delete**). 

To update the list of available images, click **Update images list** on the view page. You can check the connection by clicking the **Refresh status** button.

## Viewing and scanning images

Once the registry is connected, the resulting image names are automatically displayed in the `Components -> Container images` section. Each entry in the list contains the following information:

- **Name** - image name;
- **Container registry** - name of the registry that contains the image;
- **Dependencies** - number of dependencies found;
- **Vulnerabilities** - number of found vulnerabilities;
- **Scan status** - scan status of the image;
- **Block status** - component block status as of the last request (for repositories with CodeScoring OSA plugin);
- **Last scanned** - date of the last scan.

By default, the added image is not scanned. To perform the analysis, go to the image page and click on the **Run SCA** button. Based on the scan results, the image page will display information about the found dependencies and vulnerabilities, as well as the list of triggered security policies.

For each scanned image you can download SBoM and PDF reports and view the scan history by clicking **SCA scan history**.

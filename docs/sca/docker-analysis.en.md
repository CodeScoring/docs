---
hide:
  - footer
---
# Viewing and scanning container images

Once the [registry is connected](/on-premise/how-to/registries.en), the container image names are automatically displayed in the `Components -> Container images` section. Each entry in the list contains the following information:

- **Name** - image name;
- **Container registry** - name of the registry that contains the image;
- **Dependencies** - number of dependencies found;
- **Vulnerabilities** - number of found vulnerabilities;
- **Scan status** - scan status of the image;
- **Block status** - component block status as of the last request (for repositories with CodeScoring OSA plugin);
- **Last scanned** - date of the last scan.

By default, the added image is not scanned. To perform the analysis, go to the image page and click on the **Run SCA** button. Based on the scan results, the image page will display information about the found dependencies and vulnerabilities, as well as the list of triggered security policies.

For each scanned image you can download SBoM and PDF reports and view the scan history by clicking **SCA scan history**.
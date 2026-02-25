- [Русский](https://docs.codescoring.ru/osa/components/index.md)

# Working with OSA components

Components that are checked by the plugin are displayed in the `OSA` section of the CodeScoring UI.

## View package list

The list of scanned packages can be viewed in the `OSA -> Packages` subsection. The Packages table contains **all** packages that were scanned while the OSA plugin was running, with the following information:

- **Package** – name of the package (with a link to its page);
- **Technology** – technology (programming language or assembly tool);
- **Licenses** – licenses;
- **Authors** – authors;
- **Vulnerabilities** - number of vulnerabilities found;
- **Block status** – component blocking status at the time of the last request;
- **Release date** – date of publication of the package in the public domain;
- **Last requested at** – date and time of the last package request.

The package table can be filtered by technology, license, blocking status, or time of last component request.

By clicking on the name of the package, you can go to its individual page, where information about the found vulnerabilities and triggered policies is displayed.

## View a list of container images

Container images are displayed in the `OSA -> Container images` subsection after connecting the corresponding [registry](/on-premise/how-to/registries.en/). Each entry in the list contains the following information:

- **Name** – name of the image;
- **Container registry** – name of the registry that contains the image;
- **Dependencies** – number of dependencies found;
- **Vulnerabilities** - number of vulnerabilities found;
- **Scan status** – image scanning status;
- **Block status** – component blocking status at the time of the last request (for repositories with the OSA plugin);
- **Last scanned** – date and time of the last scan;
- **Last requested at** – date and time of the last package request.

The table with images can be filtered by registry name, as well as scanning and blocking status.

By default, the added image is not scanned. To carry out the analysis, you need to go to the image page and click on the **Run SCA** button. Based on the scanning results, information about the found dependencies and vulnerabilities, as well as a list of triggered security policies, will appear on the image page.

A SBOM and a PDF report are available for download, based on the data from the most recent successful image scan.

## View component requests

The list of component requests from proxy repositories with the plugin connected can be viewed in the `OSA -> Requests` subsection.

Package requests appear on the **Packages** tab and by default contain the following information:

- **Package** – name of the package (with a link to its individual page);
- **Technology** – technology;
- **Plugin mode** – [plugin operating mode](/osa/nexus_osa.en/#setting-the-plugin-operating-mode);
- **Block status** – blocking status;
- **Requested at** – date and time of the request;
- **Request initiator** - request initiator username from repository manager.

Container image requests appear on the **Container images** tab and by default contain the following information:

- **Container image** – name of the image (with a link to its individual page);
- **Registry** – name of the registry that contains the image;
- **Plugin mode** – [plugin operating mode](/osa/nexus_osa.en/#setting-the-plugin-operating-mode);
- **Block status** – blocking status;
- **Requested at** – date and time of the request;
- **Request initiator** - request initiator username from repository manager.

You can also display the **CodeScoring User** (CodeScoring user configured in the OSA plugin) and **Requested PURL** (PURL of the requested component) columns for both tables.

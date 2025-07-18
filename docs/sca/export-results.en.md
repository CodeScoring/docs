---
hide:
  - footer
---

# Exporting analysis results

## Exporting to CSV

Each table with analysis results in CodeScoring can be exported in CSV format using the **Export** button in the upper right corner of the interface.

The CSV table will take into account the filters used at the time of export.

## Generating a PDF report on a project

After performing composition analysis, the generation of a PDF report with summary information on the project becomes available on the project page.

You can export a PDF report with the latest analysis data on the project page using the **Export PDF** button. You can export an analysis report for a specific date on the `SCA Scan History` page.

The resulting report contains the following data by default:

- general information on the project (name, VCS branch, time of the last analysis, commit hash);
- distribution of vulnerabilities by CVSS;
- distribution of vulnerabilities by technology;
- table of found dependencies divided by technologies and development environment;
- table of found vulnerabilities divided by technologies and development environment;
- active policy alerts;
- dependency graph.

It's also possible to define a custom filename, choose required data blocks and filter data before export.
If a filename is not set, it will be generated automatically according to the following rules:

- For projects: `report_<project name>.pdf`
- For container images: `report_<image name>_<first 8 hash chars>.pdf`

![PDF export modal](/assets/img/pdf-export-modal-en.png)

## Working with SBOM within a project

After performing composition analysis of the project it becomes possible to export the obtained list of used components (SBoM) in CycloneDX format.

You can export the obtained SBoM on the project page in the `Projects` section by clicking the **Export SBoM** button.

SBoM export is supported in the following formats:

- [CycloneDX v1.4 JSON](https://cyclonedx.org/docs/1.4/json/);
- [CycloneDX v1.5 JSON](https://cyclonedx.org/docs/1.5/json/);
- [CycloneDX v1.6 JSON](https://cyclonedx.org/docs/1.6/json/);
- CycloneDX v1.6 Ext JSON – extended CycloneDX format containing additional properties: `GOST:attack_surface`, `GOST:security_function`, `GOST:source_lang`. The format is adapted to additional requirements for the SBoM from the FSTEC of Russia.

SBoM export also supports additional export customization, like the PDF one.
Automatic SBoM filename generation rules are following:

- For projects: `bom_<project name>_<SBoM format>.json`
- For container images: `bom_<image name>_<first 8 hash chars>_<SBoM format>.json`

For CLI projects, SBoM can also be loaded via the interface using the **Import SBoM** button. The loaded SBOM must be in CycloneDX format and have the `.json` extension.

### Configuring dependency properties for SBoM export {#bom-settings}

To configure dependency properties, go to the page by clicking the `Configure dependencies` button in the **Dependencies** table of the project.

![Dependencies settings button](/assets/img/dependencies_settings_button.png)

The page allows you to specify the attack surface (**Attack surface**), security function (**Security function**), version control system (**VCS**) and licenses for each project component.

![Dependencies settings](/assets/img/dependencies_settings.png)

The values entered are taken into account:

- when exporting SBoM from the project page;
- when exporting SBoM from the scan results history page (for the most recent successful SCA scan);
- during subsequent scans of the project;
- when scanning the project via the Johnny console agent;
- in the project dashboard;
- on the license page.

**Important**: Changes to values do not apply to previous scans of the project and only relate to the SBoM of the current project, even if a dependency is used in multiple projects.

#### VCS

The **VCS** field allows you to specify the URL of the repository where the dependency code is stored. When exporting SBoM, the selected value is taken into account in the [externalReferences](https://cyclonedx.org/docs/1.6/json/#components_items_externalReferences) field.

#### Attack surface

The **Attack surface** field allows you to specify whether the component belongs to an attack surface. You can select one of the following values:

- `yes` — the component is part of the direct attack surface;
- `indirect` — the component is part of the indirect attack surface;
- `no` — otherwise (default value).

When exporting SBoM in the `CycloneDX v1.6 Ext JSON` format, the selected value is taken into account in the `GOST:attack_surface` property of the component.

#### Security function

The **Security function** field allows you to specify whether the component belongs to the security functions of the information security tool. You can select one of the following values:

- `yes` — if the component functions directly implement security functions;
- `indirect` — if the component functions participate in the implementation of security functions, interacting with components implementing security functions;
- `no` — if the component functions do not participate in the implementation of security functions (default value).

When exporting SBoM in the `CycloneDX v1.6 Ext JSON` format, the selected value is taken into account in the `"GOST:security_function"` property of the component.

#### Licenses

The **Licenses** field allows you to specify the licenses of the component.

If an empty list is specified, the values found during the last SCA analysis are selected.

When exporting SBoM, the selected values are taken into account in the `licenses` field of the component.

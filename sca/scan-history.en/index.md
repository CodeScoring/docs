- [Русский](https://docs.codescoring.ru/sca/scan-history/index.md)

# Tracking scan history

For each project analysis within the SCA module, a snapshot of the results of found dependencies and vulnerabilities is saved. To see the list of available snapshots, you should go to the SCA tab on the project page and click on the **SCA scan history** button.

The snapshot contains the following data:

- **Started at** - the date the project was scanned. The date of the latest scan is marked with a green label;
- **Duration** – the time the analysis lasted;
- **Scan Source** - startup type, manual or scheduled;
- **Initiator** - user who started the scan. For scheduled runs the value is set to "system";
- **VCS reference** - branch and SHA of the commit (for VCS projects);
- **Dependencies count** - number of found dependencies;
- **Vulnerabilities count** - number of found vulnerabilities;
- **Status** - status of completed scanning. It can have three possible values - success, failed or canceled.

The buttons on the right side of the list allow to download a SBOM generated during the analysis and [export a PDF report](/sca/export-results.en/#generating-a-pdf-report-on-a-project).

To view scan details, click on the link with the scan date in the first column. A list of project dependencies and vulnerabilities, as well as dependency graph for the particular scan are available on this page.

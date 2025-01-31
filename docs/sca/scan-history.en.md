---
hide:
  - footer
---
# Tracking scan history

For each project analysis within the SCA module, a snapshot of the results of found dependencies and vulnerabilities is saved. To see the list of available snapshots, you should go to the SCA tab on the project page and click on the **SCA scan history** button.

![Scan history](/assets/img/sca_history_button.png)

The snapshot contains the following data:

- **Started at** - the date the project was scanned. The date of the latest scan is marked with a green label;
- **Startup type** - startup type, manual or scheduled;
- **User** - user who started the scan. For scheduled runs the value is set to "system";
- **VCS reference** - branch and SHA of the commit (for VCS projects);
- **Dependencies count** - number of found dependencies;
- **Vulnerabilities count** - number of found vulnerabilities;
- **Status** - status of completed scanning. It can have three possible values - success, failed or canceled.

The buttons on the right side of the list allow to download a SBOM generated during the analysis and export a PDF report.

![Scan history page](/assets/img/sca_history_page.png)
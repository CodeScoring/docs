---
hide:
  - footer
---
# Launch analysis

## Manual analysis start

SCA-analysis is started automatically right after adding a project. To manually run the analysis for a project, use the **Run Now** button on the project page in the `Projects` section.

You can also run the analysis for all projects and for each module (SCA, Quality, Authors) separately. The launch of the overall analysis is controlled in the `Settings -> Workmode` section.

**Important!** To get correct results, you should run the analysis for each module sequentially, having first waited until the previous run is completed. The order of launching:

1. Software Composition Analysis (SCA)
2. Authors Analysis
3. Quality Analysis

The progress of the analysis can be tracked in the `Settings -> Audit log` section.

The first run of Authors analysis may take a while to complete, as it traverses the entire repository history. Subsequent runs will only parse the commit differences since the last run.

## Scheduled analysis

In addition to manual runs, you can set up scheduled analysis of individual projects.

This is controlled on the project page in `Settings -> Projects`. 

By default, the **Scan Schedule** parameter is set to **Off**. To activate scheduled analysis, you need to select one of two options:

- Daily - daily analysis;
- Weekly - weekly analysis.

## History of scanning results

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

The buttons on the right side of the list allows you to download the SBOM generated during the analysis and export a PDF report.

![Scan history page](/assets/img/sca_history_page.png)

---
hide:
  - footer
---
# Configuring and launching analysis

## Configuring analysis  

When starting an analysis from the installation, you can select the analysis parameters.  

Management is done on the project page under `Settings -> Projects`.  

- **Scan with hashes** - scans the project using file hash sums to detect direct dependency inclusions;  
- **Scan ignored paths** - list of paths that will be ignored during scanning;
- **Prevent recursive scan** - turns off deep directory traversal during scanning. Only manifests in the root directory will be found;
- **Activate cloud resolve** - activate dependency resolution in cloud. Warning! Cloud resolution could provide inaccurate results and lead to extended scan time;
- **Exclude from SCA** - exclude current project from SCA analysis;

## Starting manual analysis

Composition analysis (SCA) starts immediately after a project is added. To manually run the analysis for a project, use the **Run Now** button on the project page in the `Projects` section.

You can also run the analysis for all projects and for each module (SCA, Quality, Authors) separately. To control the launch of the analysis for all projects go to the `Settings -> Workmode` section.

**Important!** To ensure accurate results, run the analysis for each module **sequentially**, waiting for the previous run to complete before proceeding. The order of launching:

1. Software Composition Analysis (SCA)
2. Authors Analysis
3. Quality Analysis

The progress of the analysis can be tracked in the `Settings -> Audit log` section.

The first run of Authors analysis may take a while to complete, as it traverses the entire repository history. Subsequent runs will only parse the commit differences since the last run.

## Scheduled analysis

In addition to manual runs, you can set up scheduled analysis of individual projects.

This is controlled on the project page in `Settings -> Projects`. 

By default, the **SCA Scan Schedule** parameter is set to **Off**. To activate scheduled analysis, you need to select **On** and select time and days of week.

**Note**: Selected time will be treated as UTC +3.

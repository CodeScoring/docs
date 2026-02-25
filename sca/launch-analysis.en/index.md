- [Русский](https://docs.codescoring.ru/sca/launch-analysis/index.md)

# Setting up and running the analysis

## Setting up the analysis

When running the analysis on the platform, you can select parameters for individual projects.

Management is performed on the project page in the `Settings -> Projects` section.

- **Scan with hashes** - scans the project using the hash sums of files to search for direct inclusion of dependencies;
- **Analysis path exclusions** - a list of directories that will be ignored during scanning;
- **Disable recursive scanning** - disables directory depth traversal during scanning. Only manifests in the root directory will be found;
- **Activate cloud resolve** - enable dependency resolution in the cloud. Warning! Using cloud resolve may give inaccurate results and increase the analysis time;
- **Exclude from SCA analysis** - exclude this project from SCA analysis;

## Manual launch of analysis

Compositional analysis (SCA) is launched automatically immediately after adding a project. To manually launch the analysis for a project, use the **Run SCA** button on the project page. In this case, you can select a separate branch or tag for analysis, which will be taken into account in the scan history.

You can also launch the analysis for all projects and for each analysis type (SCA, Quality, Authors) separately. You can manage the launch of the general analysis in the `Settings -> Workmode` section.

**Important!** To obtain correct results, you need to launch the analysis sequentially for each module, having previously waited for the completion of the previous run. Launch order:

1. Software Composition Analysis (SCA)
1. Authors Analysis
1. Quality Analysis

The progress of the analysis can be monitored by messages in the `Settings -> Audit log` section.

The first launch of the authors analysis can take a noticeable time, since the entire repository history is traversed. Subsequent runs will only analyze the difference in commits for updates since the last run.

## Scheduled analysis

In addition to manual launch, you can set up scheduled analysis of individual projects. This is managed on the project page in the `Settings -> Projects` section.

By default, the **SCA scan schedule** parameter is set to **Off**. To activate scheduled analysis, select **On** and specify the time and days of the week.

**Note**: The scan time will be calculated according to UTC +3.

---
hide:
- footer
---
# CodeScoring SCA

## General description

The **CodeScoring** SCA module solves the problems of software inventory and vulnerability search in open source components. The main functional capabilities of the module include:

- **Control at different stages of development lifecycle** with the ability to [check projects in the version control system](/sca/launch-analysis.en);
- **Integration of checks into the CI pipeline** with blocking security policies using the [console agent Johnny](/agent/index.en);
- **Generating SBoM** and [visualization of the dependency graph](/sca/graphs.en);
- **Analysis at different levels**: manifest parsing, [resolving transitive dependencies](/agent/resolve.en), [build interception](/agent/scan-build.en) for C and C++, [scanning Docker images](/sca/docker-analysis.en);
- **Tracking scan history** with the ability to [export results for reporting](/sca/export-results.en).
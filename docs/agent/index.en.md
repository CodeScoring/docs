---
hide:
  - footer
---

# CLI agent

The CLI agent **Johnny** is provided with the on-premise version of CodeScoring.

Agent is an executable binary file that parses manifests of well-known package managers, scans Docker images, analyzes C and C++ builds, parses archives, and searches for direct inclusions of Open Source libraries by hashes. The agent works in tandem with the installation, receiving enriched data on vulnerabilities, licenses, and configured policies from it, and saving scan results to CLI projects.

By default, the agent build is provided for Linux-compatible systems. Builds for Windows and MacOS are available upon request.
You can download the agent executable file via installation using the following addresses:

- `[installation-url]/download/` – page with a list of available executable files;
- `[installation-url]/download/johnny_version` – current version of the binary agent;
- `[installation-url]/download/<file-name>` – download the executable file.

To view the current version and download the file, you need to authorize using an API token.

## Mechanism of operation

When working in source code directory scanning mode, the agent recursively traverses the directory specified in the launch parameters and searches for and parses manifests of [known package managers](/supported-package-managers.en).

In the [image scanning](/agent/scan-docker.en) mode, the agent examines the file system of the specified image, making an inventory of its component content.

At the end of the work, a **SBOM** file is generated, and information about the vulnerabilities found and triggered policies is displayed in the console.

Example output of found vulnerabilities:

![Johnny example with vulnerabilities](/assets/img/johnny_output_vulnerabilities.png)

Example output of triggered policies:

![Johnny example with policy alerts](/assets/img/johnny_output_alerts.png)

Example output of reachable vulnerabilities:

![Johnny example with reachability](/assets/img/reachability-paths.png)

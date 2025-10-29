---
hide:
- footer
---

# Scanning a SBOM

In case of scanning an existing Software Bill of Materials (SBOM) in the **CycloneDX** format, you can use the `scan bom` command.

When the agent is launched, it does the following:

1. Parses the specified SBOM.
2. Generates a request to the platform to analyze the contents.
3. After the analysis is complete, it displays summary information about the results in the console, as well as tables with the vulnerabilities found and the policies that were triggered.
4. Additionally, the `bom.json` file is created in the current directory, containing the supplemented SBOM.

Depending on the launch parameters, the agent returns the appropriate exit code:

- **0** – successful scanning, no problems were detected;
- **1** – problems were found as a result of scanning, user action is required;
- **2** – scanning error;
- **3** – empty result, no artifacts were found for analysis. Returned only if `--block-on-empty-result` parameter is `true`.

## Command example

To scan SBOM, you must specify the path to it when running the command.

```bash
./johnny scan bom path/to/bom \
--api_token <api_token> \
--api_url <api_url>
```

## Command parameters

The **scan bom** command has two unique parameters, in addition to the [general scan command settings](/agent/scan.en/#launch-options):

- `--branch-or-tag` – a reference to a branch or repository tag. Format `^refs/(heads|tags)/.+` (e.g. `refs/tags/v1.0`);
- `--commit` – specifying the commit hash.
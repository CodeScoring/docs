---
hide:
- footer
---

# Scanning a file

If you need to scan a single manifest within a directory, you can use the `scan file` command.

During launching the agent:

1. Identifies the format of the specified file and parses the contents.
2. Generates a request to the installation to analyze the contents.
3. After receiving the results, displays general information about the found manifests, dependencies, vulnerabilities, and policies that have been triggered.
4. Additionally, a `bom.json` file is created in the current directory, containing the full Software Bill of Materials in the **CycloneDX** format.

Depending on the launch parameters, the agent returns the appropriate exit code:

- **0** – successful scanning, no issues were detected;
- **1** – issues were found as a result of scanning, user action is required;
- **2** – scanning error;
- **3** – empty result, no artifacts were found for analysis. Returned only if `--block-on-empty-result` parameter is `true`.

## Example of running command

To scan only one file, without processing nested directories or other manifests, you must specify the file path when running the command.

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
```
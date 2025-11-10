---
hide:
- footer
---

# Searching secrets in CLI projects

## Importing a report into a CLI project

You can import a separately created report in `json` format into a CLI project. You can read about using **Gitleaks** in the command line in the [tool documentation](https://github.com/gitleaks/gitleaks?tab=readme-ov-file#usage).

1. After receiving a report from the tool, you need to go to the Secrets tab of the selected project.
	![CLI Project](/assets/img/secrets/cli-project-en.png)
2. Click the **Import report file** button.
	![CLI Upload](/assets/img/secrets/cli-upload-en.png)
3. Select the report file and specify the tool it was created with, then click the **Upload** button.

## Scanning CLI projects

To scan secrets in CLI projects and integrate scans into the CI/CD pipeline, use the `secrets gitleaks dir` command in the Johnny console agent.

**Important**: The agent only works with Gitleaks version 8.19.0 and above.

You can read more about using the command [in the agent's documentation](/agent/scan-secrets.en).
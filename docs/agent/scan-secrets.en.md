---
hide:
- footer
---

# Scanning for secrets

Scanning for secrets is performed using the `johnny secrets gitleaks dir` command.

When launched, the agent:

1. Analyzes files in the specified directory for secrets (passwords, tokens, access keys, etc.).
	- excludes files and directories specified in `.gitleaksignore`;
	- ignores secrets recorded in the Gitleaks report if `baseline-path` is specified.
2. Generates results for the found secrets, saves them on the CodeScoring installation if necessary, and creates a report in GitLab format.

**Important**: The agent only works with Gitleaks version 8.19.0 and above.

## Example of running the command

```bash
johnny secrets gitleaks dir . \
--gitleaks-path <path-to-gitleaks> \
--api_token <api_token> \
--api_url <api_url> \
--save-results \
--create-project \
--project <project-name> \
--gitleaks-ignore-path .gitleaksignore \
--gl-secrets-report \
--gl-secrets-report-filename secrets-report.json
```

This command starts scanning secrets in the current directory, ignoring files listed in `.gitleaksignore`, sends the results to the CodeScoring installation, and generates a report in GitLab format, saving it to `secrets-report.json`.

## Command Parameters

The **johnny secrets gitleaks dir** command has the following unique parameters, in addition to the [general scan command settings](/agent/scan.en/#launch-options):

### Secrets search startup parameters

- `--gitleaks-path` – path to the Gitleaks executable file that will be used during scanning. If not set system command `gitleaks` will be executed.
- `--gl-secrets-report` – enable generation of a report on found secrets in GitLab format.
- `--gl-secrets-report-filename` – name of the output file for the report in GitLab format (by default `gl-secrets-report.json`).

#### Gitleaks parameters

- `--baseline-path` – path to the Gitleaks report file, which is used as a baseline for ignoring previously found secrets. - `--enable-rule` – list of rule IDs that will be **enabled** during scanning.
- `--gitleaks-ignore-path` – path to `.gitleaksignore` file or directory containing it, to exclude files and directories from scanning.
- `--ignore-gitleaks-allow` – ignore `gitleaks:allow` comments that mark lines as safe to ignore.
- `--log-level` – logging level that controls the verbosity of output messages. Possible values: `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
- `--max-decode-depth` – maximum depth of recursive decoding when searching for secrets. The value `0` disables decoding.
- `--max-target-megabytes` – maximum size of analyzed files in megabytes. Files larger than this size will be skipped.
- `--no-banner` – disables the Gitleaks banner that is displayed when the tool is launched.
- `--no-color` – disables color output for verbose mode.
- `--redact` – masks found secrets in logs. You can specify intermediate values (for example, `20` to hide 20% of the secret).
- `--verbose` – enables verbose output, providing more information about the scanning process.

For a summary of available command options and usage instructions, you can call the command with the `-h, --help` flag.
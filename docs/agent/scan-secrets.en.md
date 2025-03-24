---
hide:
- footer
---
# Scanning for secrets

Scanning for secrets is performed using the `johnny secrets gitleaks dir` command.

When launched, the agent:

1. Analyzes files in the specified directory for secrets (passwords, tokens, access keys, etc.) using the specified engine;
	1. Excludes files and directories specified in `.gitleaksignore`;
	2. Ignores secrets recorded in the Gitleaks report if `baseline-path` is specified;
2. Generates a report with the secrets found, optionally saving it in GitLab format.

## Example of running the command

```bash
johnny secrets gitleaks dir . \
--baseline-path gitleaks-report.json \
--gitleaks-ignore-path .gitleaksignore \
--log-level info \
--redact 100 \
--gl-secrets-report \
--gl-secrets-report-filename secrets-report.json
```

## Command Parameters

The **johnny secrets gitleaks dir** command has 14 unique parameters, in addition to the [general scan command settings](/agent/scan.en/#_2):

- `--baseline-path` – path to the Gitleaks report file, which is used as a baseline for ignoring previously found secrets.
- `--enable-rule` – list of rule IDs that will be **enabled** during scanning. - `--gitleaks-ignore-path` – path to `.gitleaksignore` file or directory containing it, to exclude files and directories from scanning.
- `--gitleaks-path` – path to Gitleaks executable file, which will be used for scanning.
- `--ignore-gitleaks-allow` – ignore `gitleaks:allow` comments, which mark lines as safe to ignore.
- `--log-level` – logging level, which controls verbosity of output messages. Possible values: `trace`, `debug`, `info`, `warn`, `error`, `fatal`.
- `--max-decode-depth` – maximum depth of recursive decoding when searching for secrets. The value `0` disables decoding.
- `--max-target-megabytes` – maximum size of analyzed files in megabytes. Files larger than this size will be skipped.
- `--no-banner` – disables the Gitleaks banner that is displayed when the tool is started.
- `--no-color` – disables color output for verbose mode.
- `--redact` – masks found secrets in logs. You can specify intermediate values (for example, `20` to hide 20% of the secret).
- `--verbose` – enables verbose output, providing more information about the scanning process.
- `--gl-secrets-report` – enables generating a report on found secrets in GitLab format.
- `--gl-secrets-report-filename` – name of the output file for the report in GitLab format.

For a summary of available command options and usage instructions, you can call the command with the `-h, --help` flag.
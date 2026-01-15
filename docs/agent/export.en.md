---
hide:
- footer
---

# Exporting scan results

The Johnny console agent supports exporting scan results in various formats. This allows to adapt reporting to different needs, including integration with vulnerability management systems.

## Report on found vulnerabilities

### Available formats

- **coloredtable** – colored table in the console. Default format;
- **table** – simple table;
- **text** – text report;
- **junit** – used in CI/CD (Jenkins, GitLab CI, GitHub Actions);
- **sarif** – exported to DefectDojo and other vulnerability management systems;
- **csv** – used in BI systems, Excel, Pandas, SQL;
- **gl-dependency-scanning-report** – report format for [GitLab Dependency Scanning](https://docs.gitlab.com/ee/user/application_security/dependency_scanning/);
- **gl-code-quality-report** – report format for [GitLab Code Quality](https://docs.gitlab.com/ee/ci/testing/code_quality.html);
- **gl-secrets-report** – report format for [GitLab Secret Detection](https://docs.gitlab.com/user/application_security/secret_detection/).

### Usage example

If necessary, you can specify multiple formats, separating them with commas, for example:

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
--format "coloredtable, junit>>junit.xml"
```

In this example, the output will be in the `coloredtable` format to the console, and also saved to the `junit.xml` file in the `junit` format.

## Report on triggered policy alerts

### Available formats

- **coloredtable** – colored table in the console. Default format;
- **table** – simple table;
- **text** – text report;
- **json** – a structured format based on JavaScript Object Notation, suitable for data processing;
- **csv** – text format for table data;

**Important**: data structure of the `json` format can be changed in the upcoming versions of the binary agent;

### Usage example

If necessary, you can specify multiple formats, separating them with commas, for example:

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
--alerts-format "coloredtable, json>>alerts.json"
```

In this example, the output will be in the `coloredtable` format to the console, and also saved to the `alerts.json` file in the `json` format.

## Report on policy ignoring

The report is generated using the `--policy-ignores` flag. The report includes policy ignores for the project specified in `--project`.

### Available formats

- **coloredtable** – colored table in the console. Default format;
- **table** – simple table;
- **text** – text report;
- **json** – a structured format based on JavaScript Object Notation, suitable for data processing;
- **csv** – text format for table data;

**Important**: data structure of the `json` format can be changed in the upcoming versions of the binary agent;

### Usage example

If necessary, you can specify multiple formats, separating them with commas, for example:

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
--project <project> \
--policy-ignores \
--ignores-format "coloredtable, json>>ignores.json"
```

In this example, the output will be in the `coloredtable` format to the console, and also saved to the `ignores.json` file in the `json` format.
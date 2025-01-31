---
hide:
- footer
---

# Exporting scan results

The Johnny console agent supports exporting scan results to several formats. This allows to adapt reporting to various needs, including integration with vulnerability management systems.

## Available report formats

- **coloredtable** – colored table in the console. Default format;
- **table** – simple table;
- **text** – text report;
- **junit** – used in CI/CD (Jenkins, GitLab CI, GitHub Actions);
- **sarif** – unloaded to DefectDojo, CodeQL, Semgrep;
- **csv** – used in BI systems, Excel, Pandas, SQL;
- **gl-dependency-scanning-report** – report format for [GitLab Dependency Scanning](https://docs.gitlab.com/ee/user/application_security/dependency_scanning/);
- **gl-code-quality-report** – report format for [GitLab Code Quality](https://docs.gitlab.com/ee/ci/testing/code_quality.html).

### Usage example

If necessary, you can specify multiple formats, separating them with commas, for example:

```bash
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url> \
--format coloredtable,junit>>junit.xml
```

In this example, the output will be in the `coloredtable` format to the console, and also saved to the `junit.xml` file in the `junit` format.
---
hide:
  - footer
---

# Scanning a file

If you need to scan a single manifest within a directory, you can use the `scan file` command.

During launching the agent:

1. Identifies the format of the specified file and parses the contents.
2. Generates a request to the platform to analyze the contents.
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
--api_url <api_url>
```

## Command parameters

The **scan file** command has three unique parameters, in addition to the [general scan command settings](/agent/scan.en/#launch-options):

- `--branch-or-tag` – a reference to a branch or repository tag (e.g. `refs/tags/v1.0`);
- `--commit` – specifying the commit hash;
- `--parser` – the parser to use.

For a summary of the available command parameters and usage instructions, you can call the command with the `-h, --help` flag.

## Available parsers

| Language     | Parsers                                                                                                                                                                                                                                                                                    |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Conda**     | `conda.conda-lock_yml`, `conda.conda_yml_env`                                                                                                                                                                                                                                              |
| **Ruby**      | `ruby.gemfile`, `ruby.gemfile_lock`, `ruby.gemspec`                                                                                                                                                                                                                                        |
| **С#**    | `csharp.packages_lock_json`, `csharp.project_json`, `csharp.project_lock_json`, `csharp.dependencyreport_json`, `csharp.paket_dependencies`, `csharp.nuspec`, `csharp.csproj`, `csharp.packages_config`, `csharp.dotnet_csproj_env`, `csharp.project_assets_json`, `csharp.paket_lock`     |
| **PHP**       | `php.composer_json`, `php.composer_lock`, `php.composer_env`                                                                                                                                                                                                                               |
| **Python**    | `python.poetry_pyproject_toml_env`, `python.requirements_txt`, `python.pipfile`, `python.poetry_lock`, `python.pip-resolved-dependencies_txt`, `python.setup_py`, `python.pipfile_lock`, `python.pyproject_toml`, `python.pip_env`, `python.uv_lock`                                       |
| **C**     | `clang.conan_lock`, `clang.conanfile_txt`, `clang.conanfile_py`                                                                                                                                                                                                                            |
| **Go**        | `go.go_mod`, `go.go_sum`, `go.go_mod_env`                                                                                                                                                                                                                                                  |
| **Objective-C** | `objective_c.podfile`, `objective_c.podfile_lock`, `objective_c.podspec`                                                                                                                                                                                                                   |
| **Rust**      | `rust.cargo_toml`, `rust.cargo_lock`                                                                                                                                                                                                                                                       |
| **Java**      | `java.pom_xml`, `java.ivy_xml`, `java.maven-dependency-tree_txt`, `java.build_gradle_env`, `java.gradle-dependency-tree_txt`, `java.gradle_kts`, `java.gradle_lockfile`, `java.maven_pom_xml_env`, `java.jar`, `java.gradle`, `java.scala_build_sbt_env`, `java.scala-dependency-tree_txt` |
| **JS**        | `js.package_json`, `js.yarn_package_json_env`, `js.yarn_lock`, `js.pnpm_package_json_env`, `js.pnpm_lock_yaml`, `js.npm_package_json_env`, `js.package-lock_json`, `js.npm-shrinkwrap_json`                                                                                                |
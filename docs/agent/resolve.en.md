---
hide:
  - footer
---

# Resolving dependencies in the build environment

Some package managers do not include transitive dependencies in their manifests by default. For high-quality compositional analysis when working with them, it is recommended to use a dependency resolution mechanism in the build environment.

## Configuring dependency resolution

When resolving dependencies in the environment, the agent checks for the absence of a lock file, independently launches the package manager or build tool, and generates a complete list of components taking into account the correct version of the build. The functionality is currently available for the following ecosystems:

- .NET
- Go
- Gradle
- Maven
- npm
- Poetry
- sbt
- yarn
- pip
- composer
- pnpm
- Conda

Options for resolving dependencies in the environment, the path to the package manager and package manager run parameters are controlled by the following parameters in the `scan` command:

- `--dotnet-resolve` / `--dotnet-path` / `--dotnet-args`
- `--go-resolve` / `--go-path`
- `--gradle-resolve` / `--gradle-path` / `--gradle-args`
- `--maven-resolve` / `--maven-path` / `--maven-args`
- `--npm-resolve` / `--npm-path` / `--npm-args`
- `--poetry-resolve` / `--poetry-path` / `--poetry-args`
- `--sbt-resolve` / `--sbt-path` / `--sbt-args`
- `--yarn-resolve` / `--yarn-path` / `--yarn-args`
- `--pip-resolve` / `--pip-path` / `--pip-args`
- `--composer-resolve` / `--composer-path` / `--composer-args`
- `--pnpm-resolve` / `--pnpm-path` / `--pnpm-args`
- `--conda-resolve` / `--conda-lock-path` / `--conda-args`

Request example:

```bash
./johnny\
scan dir. \
--api_token <api_token> \
--api_url <api_url> \
--dotnet-resolve
--dotnet-path <path/to/dotnet>
```

If necessary, the listed parameters can be added to the [agent configuration file](/agent/config.en).

### Gradle

To resolve dependencies in Gradle by default, you need to set the following value:

``` bash
--gradle-path : ./gradlew
```

The Johnny console agent generates and parses the [gradle-dependency-tree.txt](../../dependencies/java#gradle) file.
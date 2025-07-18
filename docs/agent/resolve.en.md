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

Options for resolving dependencies in the environment and the path to the package manager are controlled by the following parameters in the `scan` command:

- `--dotnet-resolve` / `--dotnet-path`
- `--go-resolve` / `--go-path`
- `--gradle-resolve` / `--gradle-path`
- `--maven-resolve` / `--maven-path`
- `--npm-resolve` / `--npm-path`
- `--poetry-resolve` / `--poetry-path`
- `--sbt-resolve` / `--sbt-path`
- `--yarn-resolve` / `--yarn-path`
- `--pip-resolve` / `--pip-path`
- `--composer-resolve` / `--composer-path`
- `--pnpm-resolve` / `--pnpm-path`
- `--conda-resolve` / `--conda-lock-path`

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
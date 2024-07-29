---
hide:
  - footer
---

# Resolving dependencies in the build environment

Some package managers do not include transitive dependencies in their manifests by default. For high-quality compositional analysis when working with them, it is recommended to use a dependency resolution mechanism in the build environment.

When resolving dependencies in the environment, the agent checks for the absence of a lock file, independently launches the package manager or build tool, and generates a complete list of components taking into account the correct version of the build. The functionality is currently available for the following ecosystems:

- .NET
- Go
- Gradle
- Maven
- npm
- Poetry
- sbt
- yarn

Options for resolving dependencies in the environment and the path to the package manager are controlled by the following flags in the `scan` command:

- `--dotnet-resolve` / `--dotnet-path`
- `--go-resolve` / `--go-path`
- `--gradle-resolve` / `--gradle-path`
- `--maven-resolve` / `--maven-path`
- `--npm-resolve` / `--npm-path`
- `--poetry-resolve` / `--poetry-path`
- `--sbt-resolve` / `--sbt-path`
- `--yarn-resolve` / `--yarn-path`

Request example:

```bash
./johnny\
scan dir. \
--api_token <api_token> \
--api_url <api_url> \
--dotnet-resolve true
--dotnet-path <path/to/dotnet>
```

If necessary, the listed parameters can be added to the [agent configuration file](/agent/config.en).

## Working with Java

When working with Java, you can alternatively create additional artifacts that contain the complete dependency structure of the project.

Command for **Apache Maven**:

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

Command for **Gradle**:

```
./gradlew dependencies > gradle-dependency-tree.txt
```

After creating the artifacts, you need to use the `scan file` command on the resulting artifact, for example:

```bash
./johnny\
scan file ./maven-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```

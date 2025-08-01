---
hide:
  - footer
---

# Resolving dependencies

Package managers of some ecosystems do not include transitive dependencies in manifests by default. To perform high-quality composition analysis when working with them, it is recommended to use the mechanism of resolving dependencies in the build environment.

## Configuring dependency resolution

Environmental dependency resolution settings, package manager paths, and runtime options are controlled by the following options in the `scan` command:

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

Command example:

```bash
./johnny\
scan dir. \
--api_token <api_token> \
--api_url <api_url> \
--dotnet-resolve
--dotnet-path <path/to/dotnet>
```

If necessary, the listed parameters can be added to the [agent configuration file](/agent/config.en).

When resolving dependencies in the environment, the agent checks for the absence of a lock file, automatically launches the package manager or build tool, and generates a complete list of components taking into account the correct version of the assembly. At the moment, the functionality is available for the following ecosystems:

### .NET

For .NET projects, the agent executes the command:

```bash
dotnet restore
````

After which the `obj/project.assets.json` file is analyzed, containing complete information about dependencies and their versions.

### Go

The agent uses data from the `go.mod` and `go.sum` files, adding entries from `go.sum` that are not present in `go.mod` (only lines without the `/go.mod` postfix). Then it runs:

```bash
go mod graph
```

The resulting list of `parent → child` pairs is used to build the dependency tree. If no parent is specified, the command is used:

```bash
go mod why <package>
```

If the parent relationship is not set, the dependency is excluded with a warning.

### Gradle

To resolve dependencies in Gradle by default, you need to set the following value:

``` bash
--gradle-path : ./gradlew
```

With the given value, the custom task is first executed:

```bash
./gradlew CodeScoring_All_Dependencies --configuration <configuration>
```

If the task is missing, the standard command is used:

```bash
./gradlew dependencies --configuration <configuration>
```

The agent parses the console output and forms a dependency graph.

### Maven

For Maven projects, the command is used:

```bash
mvn dependency:tree -f <pom.xml> -DoutputFile=<tmpdir/mdt.json>
```

The agent parses the `mdt.json` file, which contains the full dependency structure.

### npm

The agent executes:

```bash
npm install
```

Then the generated `package-lock.json` file is analyzed, recording the dependency tree and the versions used.

### pnpm

The command is executed:

```bash
pnpm install
```

The lock file `pnpm-lock.yaml` is analyzed, which contains information about all dependencies.

### yarn

The command is executed:

```bash
yarn install
```

The agent parses the `yarn.lock` file, which contains information about dependencies and their versions.

### pip

For Python projects, the command is used:

```bash
pip freeze
```

The result of the command records the list of installed dependencies and their versions.

### Poetry

Two commands are executed:

```bash
poetry debug resolve --tree
poetry debug resolve
```

The first output contains a tree with constraints, the second - specific versions. The agent compares the data and forms the final graph.

### sbt (Scala)

For Scala, the command is used:

```bash
sbt dependencyTree
```

The console output containing the project dependency structure is analyzed.

### Swift

For the Swift ecosystem, the agent executes:

```bash
swift build --package-path <path_to_Package.swift>
```

Then the `Package.resolved` file is parsed, containing the fixed versions of the packages.

### Composer (PHP)

The command is executed:

```bash
composer install
```

The agent parses the `composer.lock` file, which records the state of dependencies.

### Conda

For projects using Conda, the agent executes:

```bash
conda-lock -f <environment.yml> --filename <tmpdir/conda-lock.yml>
```

After that, the `conda-lock.yml` file is parsed, which records all project dependencies.
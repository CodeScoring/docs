---
hide:
  - footer
---

# Dependency resolution in the build environment

Package managers of some ecosystems do not include transitive dependencies in manifests by default. For high-quality composition analysis when working with them, it is recommended to use the dependency resolution mechanism in the build environment.

When resolving dependencies in the environment, the agent checks for the absence of a lock file. If a lock file is detected, the resolution is not performed even if the corresponding flags are present, and results are taken from the detected lock file. An exception applies to technologies where the name and location of the lock file are not fixed by the package manager and can be passed as a parameter to the resolution.

## Configuring dependency resolution

Dependency resolution parameters in the environment, paths to the package manager, and execution parameters are controlled by the following options in the `scan` command:

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

Example command:

```bash
./johnny \
scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--dotnet-resolve \
--dotnet-path <path/to/dotnet>
```

If necessary, the listed parameters can be added to the [agent configuration file](/agent/config).

## Supported ecosystems

### .NET

Main manifest used for dependency resolution: `.csproj`.

For .NET projects the agent runs:

```bash
dotnet restore
```

After that, the file `obj/project.assets.json`, which contains complete information about dependencies and their versions, is analyzed. Execution is performed in the directory where the `.csproj` file is located.

In case `.sln` manifest is detected dependency resolution will be executed in the context of the solution. Resolution is performed only if the `obj/project.assets.json` file does not exist for one or more components of the solution.

### Go

Main manifests used for dependency resolution: `go.mod`, `go.sum`.

The agent uses data from the `go.mod` and `go.sum` files, adding entries from `go.sum` that are missing in `go.mod` (only lines without the `/go.mod` suffix). Then it runs:

```bash
go mod graph
```

The resulting list of `parent → child` pairs is used to build the dependency tree. If the parent is not specified, the following command is used:

```bash
go mod why <package>
```

If the parent relationship is not established, the dependency is excluded with a warning.

### Gradle

Main manifests used for dependency resolution: `build.gradle`, `build.gradle.kts`.

For Gradle dependency resolution by default you must specify:

```bash
--gradle-path ./gradlew
```

With this value set, the following custom task is run first:

```bash
./gradlew CodeScoring_All_Dependencies --configuration <configuration>
```

If the task is missing, the standard command is used:

```bash
./gradlew dependencies --configuration <configuration>
```

The agent analyzes the console output and forms the dependency graph.

### Maven

Main manifest used for dependency resolution: `pom.xml`.

For Maven projects the command is:

```bash
mvn dependency:tree -f <pom.xml> -DoutputFile=<tmpdir/mdt.json>
```

The agent parses the `mdt.json` file, which contains the complete dependency structure. If the `maven-dependency-tree.txt` file exists, it will be processed as a standalone lock file, and resolution will not be performed.

### npm

Main manifest used for dependency resolution: `package.json`.

The agent runs:

```bash
npm install
```

Then it analyzes the generated `package-lock.json` file, which records the dependency tree and the versions used.

### pnpm

Main manifest used for dependency resolution: `package.json`.

The command executed:

```bash
pnpm install
```

The lock file `pnpm-lock.yaml` is analyzed, which contains data about all dependencies.

### yarn

Main manifest used for dependency resolution: `package.json`.

The command executed:

```bash
yarn install
```

The agent parses `yarn.lock`, which contains information about dependencies and their versions.

### pip

For Python projects the command used is:

```bash
pip freeze
```

The output records the list of installed dependencies and their versions. The results reference a pseudo file `codescoring_pip_for_freeze`.

### Poetry

Main manifest used for dependency resolution: `pyproject.toml`.

Two commands are executed:

```bash
poetry debug resolve --tree
poetry debug resolve
```

The first output contains the tree with constraints, the second — the specific versions. The agent matches the data and forms the final graph.

### sbt (Scala)

Main manifest used for dependency resolution: `build.sbt`.

For Scala the command used is:

```bash
sbt dependencyTree
```

The console output is analyzed, containing the project's dependency structure.

### Swift

Main manifest used for dependency resolution: `Package.swift`.

For the Swift ecosystem the agent runs:

```bash
swift build --package-path <path_to_Package.swift>
```

Then the `Package.resolved` file is parsed, which contains the locked package versions.

### Composer (PHP)

Main manifest used for dependency resolution: `composer.json`.

The command executed:

```bash
composer install
```

The agent analyzes `composer.lock`, which records the dependency state.

### Conda

Main manifests used for dependency resolution: `environment.yml`, `environment.yaml`, `meta.yml`, `meta.yaml`.

For projects using Conda, the agent runs:

```bash
conda-lock -f <environment.yml> --filename <tmpdir/conda-lock.yml>
```

After that, the `conda-lock.yml` file is analyzed, which contains all project dependencies.
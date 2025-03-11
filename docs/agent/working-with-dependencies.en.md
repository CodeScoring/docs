# Working with dependencies

## Creating lock and dep-tree files

## Java

When working with Java, you can create additional artifacts containing the full dependency structure of the project.

### Apache Maven:

#### `maven-dependency-tree.txt`

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

### Gradle:

#### `gradle-dependency-tree.txt`

```
./gradlew dependencies > gradle-dependency-tree.txt
```

After creating the artifacts, you need to use the `scan file` command on the resulting artifact, for example:

``` bash
./johnny \
scan file ./maven-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```

## Scala

### sbt

#### `scala-dependency-tree.txt` or `sbt-dependency-tree.txt`

To correctly perform compositional analysis in Scala projects using `sbt`, follow these steps:

1. **Setting the Dependency Graph Width**

To generate a full dependency graph, add the following line to the `build.sbt` file:

```scala
ThisBuild / asciiGraphWidth := 999999999
```

Alternatively, you can set the `asciiGraphWidth` value globally.

2. **Generating the dependency tree**

Run the following command to generate the dependency tree:

```bash
sbt clean compile "dependencyTree::toFile target/tree.txt"
```

Make sure to save the file with the name `scala-dependency-tree.txt` or `sbt-dependency-tree.txt`, as these are the only names supported for correct parsing.

3. **Scanning the generated file**

The `--sbt-resolve` flag in the scan command is not needed in this case, as it scans the already generated tree with the full dependency structure.

## Golang (Go Modules)

### go

#### `go.sum`

1. Initialize the module (if not already done):
```sh
go mod init <module_name>
```
2. Install dependencies:
```sh
go get <package>
```
3. After installing dependencies, `go.mod` and `go.sum` files are automatically created and updated.
4. Lock dependencies:
```sh
go mod tidy
```

## Node.js (npm and yarn)

### npm

#### `package-lock.json`

1. Initialize the project (if not already done):
```sh
npm init -y
```
2. Install dependencies:
```sh
npm install
```

### yarn

#### `yarn.lock`

1. Initialize the project:
```sh
yarn init -y
```
2. Install dependencies:
```sh
yarn install
```

## C# / .NET

### NuGet

#### `packages.lock.json`

1. Enable lock file support (for .NET 5 and above):
```sh
dotnet nuget locals all --clear
```
2. Install dependencies:
```sh
dotnet restore --use-lock-file
```

### paket

#### `paket.lock`

1. Create a lock-file:
```sh
paket install
```

## PHP

### Composer

#### `composer.lock`

1. Initialize the project (if not already done):
```sh
composer init
```
2. Install dependencies:
```sh
composer install
```

or

Create a lock-file directly:
```sh
composer update
```

## Python

### pip

#### `requirements.txt`

1. Install dependencies and save them to a lock-file:
```sh
pip freeze > requirements.txt
```

### pipenv

#### `Pipfile.lock`

1. Install pipenv (if not already installed):
```sh
pip install pipenv
```
2. Create `Pipfile.lock`:
```sh
pipenv install
```

### poetry

#### `poetry.lock`

If the `poetry.lock` file does not already exist, Poetry will create it automatically when installing dependencies. If the file already exists, it will be updated. To do this, run the command:

```bash
poetry lock
```

This command will update the dependencies specified in `pyproject.toml` and create or update the `poetry.lock` file.

## Ruby

### Bundler

### `Gemfile.lock`

1. Initialize the project (if not already done):
```sh
bundle init
```
2. Install dependencies:
```sh
bundle install
```

or

Create a lock-file directly:
```sh
bundle lock
```
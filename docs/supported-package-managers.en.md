---
hide:
  - footer
---

# Supported ecosystems and analysis methods

## Manifests

To find dependencies, CodeScoring primarily relies on parsing package manager manifest files. The platform supports parsing the following technologies:

| Ecosystem <div style="width:140px"> | Package manager or build tool <div style="width:280px"> | File format <div style="width:250px"> |
|----------------|:----------------|:-----------|
| **Java and Kotlin** | Gradle | `*.gradle`<br/>`*.gradle.kts`<br/>`gradle-dependency-tree.txt`<br/>`gradle.lockfile` |
| | Maven | `pom.xml`<br/>`maven-dependency-tree.txt` |
| | Apache Ivy | `ivy.xml` |
| **JavaScript and TypeScript** | npm | `package.json`<br/>`package-lock.json`<br/>`npm-shrinkwrap.json` |
| | yarn | `yarn.lock`<br/>`package.json`<br/>`package-lock.json`|
| | pnpm | `pnpm-lock.yaml` |
| **Python** | pip | `requirements.txt`<br/>`requirements.pip`<br/>`requires.txt` |
| | Poetry | `pyproject.toml`<br/>`poetry.lock` |
| | Pipenv | `Pipfile`<br/>`Pipfile.lock` |
| | Conda | `environment.yml`<br/>`meta.yml`<br/>`conda-lock.yml` |
| **C and C++** | Conan | `conanfile.txt`<br/>`conan.lock`<br/>`conanfile.py` |
| | GCC, Clang, CMake, Make etc. | [Build scanning](/agent/scan-build.en/)|
| **Go** | Go Modules | `go.mod`<br/>`go.sum` |
| **PHP** | Composer | `composer.json`<br/>`composer.lock` |
| **Ruby** | RubyGems | `Gemfile`<br/>`Gemfile.lock`<br/>`*.gemspec`<br/>`gems.locked` |
| **.NET** | Nuget | `*.nuspec`<br/>`packages.lock.json`<br/>`Project.json`<br/>`Project.lock.json`<br/>`packages.config`<br/>`*.csproj`<br/>`project.assets.json`<br/>`dependencyReport.json`<br/>`deps.json`<br/>`*.sln` |
| | Paket | `paket.dependencies`<br/>`paket.lock` |
| **Objective-C** | CocoaPods | `Podfile`<br/>`Podfile.lock`<br/>`*.podspec` |
| **Swift** | Swift Package Manager | `Package.swift`<br/>`Package.resolved` |
| **Rust** | Cargo | `Cargo.toml`<br/>`Cargo.lock` |
| **Scala** | sbt | `scala-dependency-tree.txt`<br/>`sbt-dependency-tree.txt` |

The best result will be achieved by combining the main manifest file and the corresponding lock file, if provided by the package manager mechanism.

## PURL Types and Components 

For unified dependency description, CodeScoring uses the **[Package URL (PURL)](https://github.com/package-url/purl-spec)** standard.

!!! example "PURL example"

    ```
    pkg:maven/org.apache.logging.log4j/log4j-core@2.17.2
    ```

When analyzing SBOM via the [agent command](/agent/scan-bom.en) or [importing into the platform](/on-premise/how-to/projects.en/#sbom), CodeScoring recognizes and supports the following PURL types according to the specification:

| PURL type      | Description | Specification |
|----------------|-------------|---------------|
| `cocoapods`    | Libraries for **Objective-C / Swift** via CocoaPods  | [CocoaPods Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/cocoapods-definition.md) |
| `conan`        | Packages in the **C / C++ (Conan)** ecosystem       | [Conan Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/conan-definition.md) |
| `conda`        | Packages in the **Python / Conda** ecosystem       | [Conda Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/conda-definition.md) |
| `nuget`        | Components for **.NET / NuGet**                     | [NuGet Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/nuget-definition.md) |
| `golang`       | **Go Modules** packages                             | [Go Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/golang-definition.md) |
| `maven`        | **Java / Kotlin** artifacts (Maven / Gradle)       | [Maven Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/maven-definition.md) |
| `npm`          | **JavaScript / TypeScript** packages               | [NPM Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/npm-definition.md) |
| `composer`     | **PHP (Composer)** packages                          | [Composer Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/composer-definition.md) |
| `pypi`         | **Python (PyPI)** packages                           | [PyPI Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/pypi-definition.md) |
| `gem`          | **Ruby (RubyGems)** packages                         | [RubyGems Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/gem-definition.md) |
| `cargo`        | **Rust (Cargo)** packages                             | [Cargo Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/cargo-definition.md) |
| `generic`      | General type for arbitrary binary or custom artifacts | [Generic Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/generic-definition.md) |
| `apk`          | **Alpine Linux** system packages                      | [APK Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/apk-definition.md) |
| `deb`          | **Debian / Ubuntu** system packages                  | [DEB Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/deb-definition.md) |
| `rpm`          | **RHEL / CentOS / Fedora** system packages           | [RPM Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/rpm-definition.md) |
| `swift`        | **Swift Package Manager** packages                    | [Swift Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/swift-definition.md) |
| `oci`          | **OCI / Docker** container images                     | [OCI Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/oci-definition.md) |
| `docker`       | **Docker Hub / Docker** images                        | [Docker Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/docker-definition.md) |
| `github`       | **GitHub** repositories                               | [GitHub Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/github-definition.md) |
| `huggingface`  | **Hugging Face Hub** models                            | [HuggingFace Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/huggingface-definition.md) |
| `mlflow`       | **MLflow Model Registry** models                       | [MLflow Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/mlflow-definition.md) |
| `pub`          | **Dart / Flutter (pub.dev)** packages                 | [Pub Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/pub-definition.md) |
| `swid`         | **SWID Tags (Software Identification Tags)**          | [SWID Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/swid-definition.md) |

Each component with a PURL is classified by type, which CodeScoring recognizes when importing SBOM files. The type is indicated in the `type` field within the component description.

!!! note "Difference between PURL and component types"
    A component type describes its functional role within a product—for example, a library, framework, or firmware. A PURL type, in turn, defines the ecosystem and source from which the component was obtained.

!!! example "SBOM component example"

    ```json
    {
      "components": [
        {
          "name": "log4j-core",
          "version": "2.17.2",
          "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.17.2",
          "type": "library"
        }
      ]
    }
    ```

Supported component types:

| Component type | Description                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------- |
| **library**    | A library, package, or third-party code module used in the project.                             |
| **framework**  | An infrastructure or application framework containing a set of libraries.                       |
| **firmware**   | Executable binary or embedded software analyzed for the presence of third-party components.     |

## System packages

As part of the OSA module, the platform supports analysing system packages of the following formats:

- [Debian](https://www.debian.org/distrib/packages)
- [Alpine](https://docs.alpinelinux.org/user-handbook/0.1a/Working/apk.html)
- [RPM](https://rpm.org)
- [AstraLinux](https://astralinux.ru/)
- [AltLinux](https://packages.altlinux.org/en/sisyphus/)

## Resolution mechanism in the absence of a lock file

If there is no lock file the system will try to resolve transitive OSS dependencies itself:

- Maven
    + for pom.xml and build.gradle format generation of `maven-dependency-tree` via the corresponding maven plugin
    + Maven version 3.8.8 and OpenJDK version 11 are used
- PyPi
     + generation of `poetry.lock` using the Poetry package manager
     + Python version 3.11.7 is used
- N.P.M.
    + generation of `yarn.lock` using the Yarn package manager
     + uses Node.js version 20.9.0
- Nuget
     + for csproj and sln format generation of `project.assets.json` using built-in nuget tools
    + uses .NET SDK version 8.0.404
- Packagist
   + generation of `composer.lock` using the Composer package manager
   + PHP version 8.2.26 is used
- Rubygems
    + generation of `Gemfile.lock` using the Bundler package manager
    + uses Ruby version 3.1.2p20

Generation of lock files by the system does not produce the best results in every case, since it often depends on the environment.

## Resolving dependencies in the build environment

Some package managers do not include transitive dependencies in their manifests by default. For high-quality compositional analysis when working with them, it is recommended to use a [dependency resolution mechanism in the build environment](/agent/resolve.en.md).

When resolving dependencies in the environment, the agent checks for the absence of a lock file, independently launches the package manager or build tool, and generates a complete list of components taking into account the correct version of the build. The functionality is currently available for the following ecosystems:

- .NET
- Go
- Gradle
- Maven
- npm
- Poetry
- sbt
- yarn
- Conda

## Mechanism for searching dependencies using hashes

Search using hashes implies detection of direct inclusion of libraries in project's code. As part of this mechanism, all project files are hashed and these signatures are compared with known open source libraries.

Currently, hash searches occur for the following package manager indexes and the following file types:

- Maven
    + `.jar`
    + `.war`
    + `.ear`
- npm
    + `.min.js`
- PyPI
    + `.whl`
    + `.egg`
- Nuget
    + `.nupkg`


Hashes of files whose size does not exceed 512 bytes **are not sent** to the cloud.

## Build scanning for C and C++

If the Conan package manager and corresponding manifests are not used to build a C/C++ project, a special [mode for analyzing the build process output](/agent/scan-build.en) can be used to get a list of used libraries.

In this mode, the Johnny console agent analyzes the build process using compiler flags and identifies the libraries used. Then, using the system cache, the location of the libraries and their source are determined.

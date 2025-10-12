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

## PURL and component types

To provide a unified description of dependencies, CodeScoring uses the **[Package URL (PURL)](https://github.com/package-url/purl-spec)** standard.

Each discovered dependency is represented as a normalized identifier that uniquely defines the component and its origin.

Example PURL:

```

pkg:maven/org.apache.logging.log4j/log4j-core@2.17.2

```

CodeScoring supports the following PURL types according to the official specification:

| PURL Type     | Description       | Specification                                        |
|----------------|------|------------|
| `cocoapods`    | Libraries for **Objective-C / Swift** via CocoaPods    | [types-doc/cocoapods-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/cocoapods-definition.md) |
| `conan`        | Packages from the **C / C++ (Conan)** ecosystem        | [types-doc/conan-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/conan-definition.md)     |
| `conda`        | Packages from **Python / Conda**                       | [types-doc/conda-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/conda-definition.md)     |
| `nuget`        | Components from **.NET / NuGet**                       | [types-doc/nuget-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/nuget-definition.md)     |
| `golang`       | Packages for **Go Modules**                            | [types-doc/golang-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/golang-definition.md)   |
| `maven`        | Artifacts for **Java / Kotlin** (Maven / Gradle)       | [types-doc/maven-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/maven-definition.md)     |
| `npm`          | Packages for **JavaScript / TypeScript**               | [types-doc/npm-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/npm-definition.md)         |
| `composer`     | Packages for **PHP (Composer)**                        | [types-doc/composer-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/composer-definition.md) |
| `pypi`         | Packages for **Python (PyPI)**                         | [types-doc/pypi-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/pypi-definition.md)       |
| `gem`          | Packages for **Ruby (RubyGems)**                       | [types-doc/gem-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/gem-definition.md)         |
| `cargo`        | Packages for **Rust (Cargo)**                          | [types-doc/cargo-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/cargo-definition.md)     |
| `generic`      | Generic type for arbitrary binary or custom artifacts  | [types-doc/generic-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/generic-definition.md) |
| `apk`          | System packages for **Alpine Linux**                   | [types-doc/apk-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/apk-definition.md)         |
| `deb`          | System packages for **Debian / Ubuntu**                | [types-doc/deb-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/deb-definition.md)         |
| `rpm`          | System packages for **RHEL / CentOS / Fedora**         | [types-doc/rpm-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/rpm-definition.md)         |
| `swift`        | Packages for **Swift Package Manager**                 | [types-doc/swift-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/swift-definition.md)     |
| `oci`          | Container images for **OCI / Docker**                  | [types-doc/oci-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/oci-definition.md)         |
| `alpm`         | Packages for **Arch Linux**                            | [types-doc/alpm-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/alpm-definition.md)       |
| `bitbucket`    | Repositories hosted on **Bitbucket**                   | [types-doc/bitbucket-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/bitbucket-definition.md) |
| `bitnami`      | Packages or images from **Bitnami**                    | [types-doc/bitnami-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/bitnami-definition.md) |
| `cran`         | Packages for **R (CRAN)**                              | [types-doc/cran-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/cran-definition.md)       |
| `docker`       | Images from **Docker Hub / Docker**                    | [types-doc/docker-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/docker-definition.md)   |
| `github`       | Repositories hosted on **GitHub**                      | [types-doc/github-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/github-definition.md)   |
| `hackage`      | Packages for **Haskell (Hackage)**                     | [types-doc/hackage-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/hackage-definition.md) |
| `hex`          | Packages for **Elixir / Erlang (Hex)**                 | [types-doc/hex-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/hex-definition.md)         |
| `huggingface`  | Models from **Hugging Face Hub**                       | [types-doc/huggingface-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/huggingface-definition.md) |
| `mlflow`       | Models from **MLflow Model Registry**                  | [types-doc/mlflow-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/mlflow-definition.md)   |
| `pub`          | Packages for **Dart / Flutter (pub.dev)**              | [types-doc/pub-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/pub-definition.md)         |
| `qpkg`         | Packages for **QNAP QPKG**                             | [types-doc/qpkg-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/qpkg-definition.md)       |
| `swid`         | **SWID Tags (Software Identification Tags)**           | [types-doc/swid-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/swid-definition.md)       |

Each PURL component is classified by its type:

| Component Type | Description                                                                                   |
|----------------|-----------------------------------------------------------------------------------------------|
| **library**    | A library, package, or third-party module used within a project.                              |
| **framework**  | An infrastructure or application framework that includes a set of libraries.                  |
| **firmware**   | An executable binary image or embedded software analyzed for third-party components.          |

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

The second dependency search mechanism implemented in CodeScoring is a hash search – a search for direct inclusion of libraries in project code. As part of this mechanism, all project files are hashed and these signatures are compared with known open source libraries.

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

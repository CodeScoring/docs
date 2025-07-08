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
| **.NET** | Nuget | `*.nuspec`<br/>`packages.lock.json`<br/>`Project.json`<br/>`Project.lock.json`<br/>`packages.config`<br/>`*.csproj`<br/>`project.assets.json`<br/>`dependencyReport.json` |
| | Paket | `paket.dependencies`<br/>`paket.lock` |
| **Objective-C** | CocoaPods | `Podfile`<br/>`Podfile.lock`<br/>`*.podspec` |
| **Swift** | Swift Package Manager | `Package.swift`<br/>`Package.resolved` |
| **Rust** | Cargo | `Cargo.toml`<br/>`Cargo.lock` |
| **Scala** | sbt | `scala-dependency-tree.txt`<br/>`sbt-dependency-tree.txt` |

The best result will be achieved by combining the main manifest file and the corresponding lock file, if provided by the package manager mechanism.

## System packages

As part of the OSA module, the platform supports analysing system packages of the following formats:

- [Debian-based](https://www.debian.org/distrib/packages)
- [Alpine-based](https://docs.alpinelinux.org/user-handbook/0.1a/Working/apk.html)
- [RPM-based](https://rpm.org)

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
 + for csproj format generation of `project.assets.json` using built-in nuget tools
 + uses .NET SDK version 8.0.404
-Packagist
 + generation of `composer.lock` using the Composer package manager
 + PHP version 8.2.26 is used
-Rubygems
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
-npm
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

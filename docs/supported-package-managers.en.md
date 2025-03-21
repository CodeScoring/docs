---
hide:
  - footer
---
# Supported ecosystems and analysis methods

## Manifest files

To find dependencies, CodeScoring primarily relies on parsing package manager manifest files. The system supports analysis of the following technologies:

Language <div style="width:140px">| Package manager or build tool <div style="width:280px"> | File format <div style="width:250px"> |
----------------| :---------------- | :---------- |
Java and Kotlin | Gradle, Maven | `pom.xml`<br/>`ivy.xml`<br/>`maven-dependency-tree.txt`<br/>`gradle-dependency-tree.txt`<br/>`*.gradle`< br/>`*.gradle.kts`<br/> `gradle.lockfile`|
JavaScript and TypeScript | npm, yarn | `package.json`<br/>`package-lock.json` <br/>`npm-shrinkwrap.json`<br/>`yarn.lock`<br/>`pnpm-lock.yaml`|
Python                      |    pip, Poetry, Pipenv, Conda    |  `setup.py`<br/>`Pipfile`<br/>`Pipfile.lock`<br/>`pyproject.toml`<br/>`poetry.lock`<br/>`requirements.txt`<br/>`requirements.pip`<br/>`requires.txt`<br/>`environment.yml`<br/>`meta.yml`<br/>`conda-lock.yml` |
C and C++ | Conan | `conanfile.txt`<br/>`conan.lock`<br/>`conanfile.py`|
Go | Go Modules | `go.mod`<br/>`go.sum` |
PHP | Composer | `composer.json`<br/>`composer.lock`|
Ruby | RubyGems | `Gemfile`<br/>`Gemfile.lock`<br/>`*.gemspec`<br/>`gems.locked`|
C# | Nuget | `*.nuspec`<br/>`packages.lock.json`<br/>`Project.json`<br/>`Project.lock.json`<br/>`packages.config`<br/>`paket.dependencies`<br/>`paket.lock`<br/>`*.csproj`<br/>`project.assets.json`|
Objective-C and Swift | CocoaPods | `Podfile`<br/>`Podfile.lock`<br/>`*.podspec`|
Rust | Cargo | `Cargo.lock`<br/>`Cargo.toml`|
Scala | sbt | `scala-dependency-tree.txt`<br/>`sbt-dependency-tree.txt`|


The best result is achieved through a combination of a manifest file and a corresponding lock file (if it is provided by the package manager mechanism).


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

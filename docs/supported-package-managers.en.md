---
hide:
  - footer
---
# Supported package managers

## Manifest files

To find dependencies, CodeScoring primarily relies on parsing package manager manifest files. The system supports analysis of the following technologies:

Language <div style="width:140px">| Package manager or build tool <div style="width:280px"> | File format <div style="width:250px"> |
----------------| :---------------- | :---------- |
Java and Kotlin | Gradle, Maven | `pom.xml`<br/>`ivy.xml`<br/>`maven-dependency-tree.txt`<br/>`gradle-dependency-tree.txt`<br/>`*.gradle`< br/>`*.gradle.kts`<br/> `gradle.lockfile`|
JavaScript and TypeScript | npm, yarn | `package.json`<br/>`package-lock.json` <br/>`npm-shrinkwrap.json`<br/>`yarn.lock` |
Python | pip, Poetry, Pipenv | `setup.py`<br/>`Pipfile`<br/>`Pipfile.lock`<br/>`pyproject.toml`<br/>`poetry.lock`<br/>`requirements.txt`<br />`requirements.pip`<br/>`requires.txt` |
C and C++ | Conan | `conanfile.txt`<br/>`conan.lock`<br/>`conanfile.py`|
Go | Go Modules | `go.mod`<br/>`go.sum` |
PHP | Composer | `composer.json`<br/>`composer.lock`|
Ruby | RubyGems | `Gemfile`<br/>`Gemfile.lock`<br/>`*.gemspec`|
C# | Nuget | `*.nuspec`<br/>`packages.lock.json`<br/>`Project.json`<br/>`Project.lock.json`<br/>`packages.config`<br/>` paket.dependencies`<br/>`paket.lock`<br/>`*.csproj`<br/>`project.assets.json`|
Objective-C and Swift | CocoaPods | `Podfile`<br/>`Podfile.lock`<br/>`*.podspec`|
Rust | Cargo | `Cargo.lock`<br/>`Cargo.toml`|
Scala | sbt | `scala-dependency-tree.txt`<br/>`sbt-dependency-tree.txt`|


The best result is achieved through a combination of a manifest file and a corresponding lock file (if it is provided by the package manager mechanism).


## Resolution mechanism in the absence of a lock file

If there is no lock file the system will try to resolve transitive OSS dependencies itself:

- Maven
 + for pom.xml and build.gradle format generation of `maven-dependency-tree` via the corresponding maven plugin
 + Maven version 3.8.3 and OpenJDK version 11 are used
- PyPi
 + generation of `poetry.lock` using the Poetry package manager
 + Python version 3.8 is used
- N.P.M.
 + generation of `yarn.lock` using the Yarn package manager
 + uses Node.js version 16
- Nuget
 + for csproj format generation of `project.assets.json` using built-in nuget tools
 + uses .NET SDK version 5
-Packagist
 + generation of `composer.lock` using the Composer package manager
 + PHP version 8 is used
-Rubygems
 + generation of `Gemfile.lock` using the Bundler package manager
 + uses Ruby version 3

Generation of lock files by the system does not produce the best results in every case, since it often depends on the environment.


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

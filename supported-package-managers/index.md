- [English](../supported-package-managers.en/)

# Поддерживаемые экосистемы и способы анализа

## Манифесты

Для поиска зависимостей CodeScoring в первую очередь опирается на разбор файлов манифестов пакетных менеджеров. Платформа поддерживает разбор следующих технологий:

| Экосистема                  | Пакетный менеджер или инструмент сборки | Формат файла                                                                                                                                                      |
| --------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Java и Kotlin**           | Gradle                                  | `*.gradle` `*.gradle.kts` `gradle-dependency-tree.txt` `gradle.lockfile`                                                                                          |
|                             | Maven                                   | `pom.xml` `maven-dependency-tree.txt`                                                                                                                             |
|                             | Apache Ivy                              | `ivy.xml`                                                                                                                                                         |
| **JavaScript и TypeScript** | npm                                     | `package.json` `package-lock.json` `npm-shrinkwrap.json`                                                                                                          |
|                             | yarn                                    | `yarn.lock` `package.json` `package-lock.json`                                                                                                                    |
|                             | pnpm                                    | `pnpm-lock.yaml`                                                                                                                                                  |
| **Python**                  | pip                                     | `requirements.txt` `requirements.pip` `requires.txt` `pip-resolved-dependencies.txt`                                                                              |
|                             | Poetry                                  | `pyproject.toml` `poetry.lock`                                                                                                                                    |
|                             | Pipenv                                  | `Pipfile` `Pipfile.lock`                                                                                                                                          |
|                             | Conda                                   | `environment.yml` `meta.yml` `conda-lock.yml`                                                                                                                     |
| **C и C++**                 | Conan                                   | `conanfile.txt` `conan.lock` `conanfile.py`                                                                                                                       |
|                             | GCC, Clang, CMake, Make и др.           | [Сканирование сборки](/agent/scan-build/)                                                                                                                         |
| **Go**                      | Go Modules                              | `go.mod` `go.sum`                                                                                                                                                 |
| **PHP**                     | Composer                                | `composer.json` `composer.lock`                                                                                                                                   |
| **Ruby**                    | RubyGems                                | `Gemfile` `Gemfile.lock` `*.gemspec` `gems.locked` `gems.rb`                                                                                                      |
| **.NET**                    | Nuget                                   | `*.nuspec` `packages.lock.json` `Project.json` `Project.lock.json` `packages.config` `*.csproj` `project.assets.json` `dependencyReport.json` `deps.json` `*.sln` |
|                             | Paket                                   | `paket.dependencies` `paket.lock`                                                                                                                                 |
| **Objective-C**             | CocoaPods                               | `Podfile` `Podfile.lock` `*.podspec`                                                                                                                              |
| **Swift**                   | Swift Package Manager                   | `Package.swift` `Package.resolved`                                                                                                                                |
| **Rust**                    | Cargo                                   | `Cargo.toml` `Cargo.lock`                                                                                                                                         |
| **Scala**                   | sbt                                     | `scala-dependency-tree.txt` `sbt-dependency-tree.txt`                                                                                                             |

Лучший результат будет при наличии основного файла манифеста и соответствующего lock-файла, если он предусмотрен механизмом пакетного менеджера.

## Системные пакеты

В рамках работы модуля OSA платформа поддерживает разбор системных пакетов следующих форматов:

- [Debian-based](https://www.debian.org/distrib/packages)
- [Alpine-based](https://docs.alpinelinux.org/user-handbook/0.1a/Working/apk.html)
- [RPM-based](https://rpm.org)

## Механизм резолва при отсутствии lock-файла

При отсутствии lock-файла для некоторых пакетных индексов система выполняет разрешение транзитивных OSS зависимостей следующим образом:

- Maven
  - для формата pom.xml и build.gradle генерация maven-dependency-tree через соответствующий плагин maven
  - используются Maven версии 3.8.8 и OpenJDK версии 11
- PyPi
  - генерация poetry.lock с помощью пакетного менеджера Poetry
  - используется Python версии 3.11.7
- NPM
  - генерация yarn.lock с помощью пакетного менеджера Yarn
  - используется Node.js версии 20.9.0
- Nuget
  - для формата csproj и sln генерация project.assets.json с помощью встроенных инструментов nuget
  - используется .NET SDK версии 8.0.404
- Packagist
  - генерация composer.lock с помощью пакетного менеджера Composer
  - используется PHP версии 8.2.26
- Rubygems
  - генерация Gemfile.lock с помощью пакетного менеджера Bundler
  - используется Ruby версии 3.1.2p20

Самостоятельная генерация lock-файлов системой не может давать результат в 100% случаев, так как результат часто зависит от окружения.

## Разрешение зависимостей в окружении

Пакетные менеджеры некоторых экосистем по умолчанию не включают транзитивные зависимости в манифесты. Для качественного проведения композиционного анализа при работе с ними рекомендуется применять механизм [разрешения зависимостей в окружении сборки](/agent/resolve).

При разрешении зависимостей в окружении система проверяет отсутствие lock-файла, самостоятельно запускает пакетный менеджер или инструмент сборки и формирует полный список компонентов с учетом корректной версии сборки. На данный момент функциональность доступна для следующих экосистем:

- .NET
- Go
- Gradle
- Maven
- npm
- Poetry
- sbt
- yarn
- Conda

## Механизм поиска зависимостей по хэшам

Второй механизм поиска зависимостей, реализованный в CodeScoring — это поиск по хэшам, то есть поиск непосредственного включения библиотек в код проектов путём копирования. В рамках этого механизма происходит хэширование всех файлов проекта и сверка этих сигнатур с известными нам open source библиотеками.

В данный момент поиск по хэшам происходит для следующих индексов пакетных менеджеров по следующим типам файлов:

- Maven
  - `.jar`
  - `.war`
  - `.ear`
- npm
  - `.min.js`
- PyPI
  - `.whl`
  - `.egg`
- Nuget
  - `.nupkg`

От платформы в облако **не уходят** хэши файлов, размер которых не превышает 512 байт.

## Сканирование сборки для языков C и C++

В случае, если для сборки C/С++ проекта не используется пакетный менеджер Conan и соответствующие манифесты, для получения списка используемых библиотек можно использовать специальный [режим для анализа вывода процесса сборки](/agent/scan-build).

В данном режиме консольный агент Johnny анализирует процесс сборки, используя флаги компилятора и выявляя использованные библиотеки. Далее с помощью системного кэша определяется местоположение библиотек и их источник.

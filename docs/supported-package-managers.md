---
hide:
  - footer
---

# Поддерживаемые экосистемы и способы анализа

## Манифесты

Для поиска зависимостей CodeScoring в первую очередь опирается на разбор файлов манифестов пакетных менеджеров. Платформа поддерживает разбор следующих технологий:

| Экосистема <div style="width:140px"> | Пакетный менеджер или инструмент сборки <div style="width:280px"> | Формат файла <div style="width:250px">                                                                                                                                                                |
|----------------|:----------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Java и Kotlin** | Gradle | `*.gradle`<br/>`*.gradle.kts`<br/>`gradle-dependency-tree.txt`<br/>`gradle.lockfile`                                                                                                                  |
| | Maven | `pom.xml`<br/>`maven-dependency-tree.txt`                                                                                                                                                             |
| | Apache Ivy | `ivy.xml`                                                                                                                                                                                             |
| **JavaScript и TypeScript** | npm | `package.json`<br/>`package-lock.json`<br/>`npm-shrinkwrap.json`                                                                                                                                      |
| | yarn | `yarn.lock`<br/>`package.json`<br/>`package-lock.json`                                                                                                                                                |
| | pnpm | `pnpm-lock.yaml`                                                                                                                                                                                      |
| **Python** | pip | `requirements.txt`<br/>`requirements.pip`<br/>`requires.txt`<br/>`pip-resolved-dependencies.txt`<br/>`pipdeptree.txt`                                                                                 |
| | Poetry | `pyproject.toml`<br/>`poetry.lock`                                                                                                                                                                    |
| | Pipenv | `Pipfile`<br/>`Pipfile.lock`                                                                                                                                                                          |
| | Conda | `environment.yml`<br/>`meta.yml`<br/>`conda-lock.yml`                                                                                                                                                 |
| | uv | `pyproject.toml`<br/>`uv.lock`                                                                                                                                                                        |
| **C и C++** | Conan | `conanfile.txt`<br/>`conan.lock`<br/>`conanfile.py`                                                                                                                                                   |
| | GCC, Clang, CMake, Make и др. | [Сканирование сборки](/agent/scan-build/)                                                                                                                                                             |
| **Go** | Go Modules | `go.mod`<br/>`go.sum`                                                                                                                                                                                 |
| **PHP** | Composer | `composer.json`<br/>`composer.lock`                                                                                                                                                                   |
| **Ruby** | RubyGems | `Gemfile`<br/>`Gemfile.lock`<br/>`*.gemspec`<br/>`gems.locked`<br/>`gems.rb`                                                                                                                          |
| **.NET** | Nuget | `*.nuspec`<br/>`packages.lock.json`<br/>`Project.json`<br/>`Project.lock.json`<br/>`packages.config`<br/>`*.csproj`<br/>`project.assets.json`<br/>`dependencyReport.json`<br/>`deps.json`<br/>`*.sln` |
| | Paket | `paket.dependencies`<br/>`paket.lock`                                                                                                                                                                 |
| **Objective-C** | CocoaPods | `Podfile`<br/>`Podfile.lock`<br/>`*.podspec`                                                                                                                                                          |
| **Swift** | Swift Package Manager | `Package.swift`<br/>`Package.resolved`                                                                                                                                                                |
| **Rust** | Cargo | `Cargo.toml`<br/>`Cargo.lock`                                                                                                                                                                         |
| **Scala** | sbt | `scala-dependency-tree.txt`<br/>`sbt-dependency-tree.txt`                                                                                                                                             |

Лучший результат будет при наличии основного файла манифеста и соответствующего lock-файла, если он предусмотрен механизмом пакетного менеджера.

## Системные пакеты

В рамках работы модуля OSA платформа поддерживает разбор системных пакетов следующих форматов:

- [Debian-based](https://www.debian.org/distrib/packages)
- [Alpine-based](https://docs.alpinelinux.org/user-handbook/0.1a/Working/apk.html)
- [RPM-based](https://rpm.org)

## Механизм резолва при отсутствии lock-файла

При отсутствии lock-файла для некоторых пакетных индексов система выполняет разрешение транзитивных OSS зависимостей следующим образом:

- Maven
    + для формата pom.xml и build.gradle генерация maven-dependency-tree через соответствующий плагин maven
    + используются Maven версии 3.8.8 и OpenJDK версии 11
- PyPi
    + генерация poetry.lock с помощью пакетного менеджера Poetry
    + используется Python версии 3.11.7
- NPM
    + генерация yarn.lock с помощью пакетного менеджера Yarn
    + используется Node.js версии 20.9.0
- Nuget
    + для формата csproj и sln генерация project.assets.json с помощью встроенных инструментов nuget
    + используется .NET SDK версии 8.0.404
- Packagist
    + генерация composer.lock с помощью пакетного менеджера Composer
    + используется PHP версии 8.2.26
- Rubygems
    + генерация Gemfile.lock с помощью пакетного менеджера Bundler
    + используется Ruby версии 3.1.2p20

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


От платформы в облако **не уходят** хэши файлов, размер которых не превышает 512 байт.

## Сканирование сборки для языков C и C++

В случае, если для сборки C/С++ проекта не используется пакетный менеджер Conan и соответствующие манифесты, для получения списка используемых библиотек можно использовать специальный [режим для анализа вывода процесса сборки](/agent/scan-build).

В данном режиме консольный агент Johnny анализирует процесс сборки, используя флаги компилятора и выявляя использованные библиотеки. Далее с помощью системного кэша определяется местоположение библиотек и их источник.

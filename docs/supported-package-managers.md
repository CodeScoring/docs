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
| **Python** | pip | `requirements.txt`<br/>`requirements.pip`<br/>`requires.txt`<br/>`pip-resolved-dependencies.txt`                                                                                                      |
| | Poetry | `pyproject.toml`<br/>`poetry.lock`                                                                                                                                                                    |
| | Pipenv | `Pipfile`<br/>`Pipfile.lock`                                                                                                                                                                          |
| | Conda | `environment.yml`<br/>`meta.yml`<br/>`conda-lock.yml`                                                                                                                                                 |
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

## Типы PURL и компонентов

Для унифицированного описания зависимостей CodeScoring использует стандарт **[Package URL (PURL)](https://github.com/package-url/purl-spec)**.

Найденная зависимость представляется в виде нормализованного идентификатора, который однозначно описывает компонент и источник его происхождения.

Пример PURL:

```
pkg:maven/org.apache.logging.log4j/log4j-core@2.17.2
```

CodeScoring поддерживает следующие типы PURL в соответствии со спецификацией:

| Тип PURL       | Описание   | Спецификация            |
|----------------|---------|------------------|
| `cocoapods`    | Библиотеки для **Objective-C / Swift** через CocoaPods  | [types-doc/cocoapods-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/cocoapods-definition.md) |
| `conan`        | Пакеты экосистемы **C / C++ (Conan)**                   | [types-doc/conan-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/conan-definition.md)     |
| `conda`        | Пакеты экосистемы **Python / Conda**                    | [types-doc/conda-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/conda-definition.md)     |
| `nuget`        | Компоненты **.NET / NuGet**                             | [types-doc/nuget-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/nuget-definition.md)     |
| `golang`       | Пакеты **Go Modules**                                  | [types-doc/golang-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/golang-definition.md)   |
| `maven`        | Артефакты **Java / Kotlin** (Maven / Gradle)           | [types-doc/maven-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/maven-definition.md)     |
| `npm`          | Пакеты **JavaScript / TypeScript**                     | [types-doc/npm-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/npm-definition.md)   |
| `composer`     | Пакеты **PHP (Composer)**                              | [types-doc/composer-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/composer-definition.md) |
| `pypi`         | Пакеты **Python (PyPI)**                               | [types-doc/pypi-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/pypi-definition.md)       |
| `gem`          | Пакеты **Ruby (RubyGems)**                             | [types-doc/gem-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/gem-definition.md)         |
| `cargo`        | Пакеты **Rust (Cargo)**                                | [types-doc/cargo-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/cargo-definition.md)     |
| `generic`      | Общий тип для произвольных бинарных или кастомных артефактов | [types-doc/generic-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/generic-definition.md)   |
| `apk`          | Системные пакеты **Alpine Linux**                      | [types-doc/apk-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/apk-definition.md)         |
| `deb`          | Системные пакеты **Debian / Ubuntu**                   | [types-doc/deb-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/deb-definition.md)         |
| `rpm`          | Системные пакеты **RHEL / CentOS / Fedora**            | [types-doc/rpm-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/rpm-definition.md)         |
| `swift`        | Пакеты **Swift Package Manager**                       | [types-doc/swift-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/swift-definition.md)     |
| `oci`          | Контейнерные образы **OCI / Docker**                   | [types-doc/oci-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/oci-definition.md)         |
| `alpm`         | Пакеты **Arch Linux**                                  | [types-doc/alpm-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/alpm-definition.md)       |
| `bitbucket`    | Репозитории **Bitbucket**                              | [types-doc/bitbucket-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/bitbucket-definition.md) |
| `bitnami`      | Пакеты / образы **Bitnami**                            | [types-doc/bitnami-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/bitnami-definition.md) |
| `cran`         | Пакеты **R (CRAN)**                                    | [types-doc/cran-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/cran-definition.md)         |
| `docker`       | Образы **Docker Hub / Docker**                         | [types-doc/docker-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/docker-definition.md)   |
| `github`       | Репозитории **GitHub**                                 | [types-doc/github-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/github-definition.md)     |
| `hackage`      | Пакеты **Haskell (Hackage)**                           | [types-doc/hackage-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/hackage-definition.md) |
| `hex`          | Пакеты **Elixir / Erlang (Hex)**                       | [types-doc/hex-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/hex-definition.md)         |
| `huggingface`  | Модели **Hugging Face Hub**                            | [types-doc/huggingface-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/huggingface-definition.md) |
| `mlflow`       | Модели **MLflow Model Registry**                       | [types-doc/mlflow-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/mlflow-definition.md)   |
| `pub`          | Пакеты **Dart / Flutter (pub.dev)**                    | [types-doc/pub-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/pub-definition.md)         |
| `qpkg`         | Пакеты **QNAP QPKG**                                   | [types-doc/qpkg-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/qpkg-definition.md)       |
| `swid`         | **SWID-теги (Software Identification Tags)**           | [types-doc/swid-definition.md](https://github.com/package-url/purl-spec/blob/main/types-doc/swid-definition.md)       |


Каждый компонент с PURL классифицируется по типу:

| Тип компонента | Описание                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------- |
| **library**    | Библиотека, пакет или модуль стороннего кода, используемый в проекте.                         |
| **framework**  | Инфраструктурный или прикладной фреймворк, включающий набор библиотек.                        |
| **firmware**   | Исполняемый бинарный образ или встроенное ПО, анализируемое на наличие сторонних компонентов. |

## Системные пакеты

В рамках работы модуля OSA платформа поддерживает разбор системных пакетов следующих форматов:

- [Debian](https://www.debian.org/distrib/packages)
- [Alpine](https://docs.alpinelinux.org/user-handbook/0.1a/Working/apk.html)
- [RPM](https://rpm.org)
- [AstraLinux](https://astralinux.ru/)
- [AltLinux](https://packages.altlinux.org/en/sisyphus/)

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

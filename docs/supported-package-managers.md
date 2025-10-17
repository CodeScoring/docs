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

Тип PURL применяется при анализе SBOM (через [команду агента](/agent/scan-bom) или [импорте в платформу](/on-premise/how-to/projects/#sbom)) для распознавания и нормализации компонентов, указанных в отчётах.  

В SBOM идентификатор компонента передаётся в поле `purl`.

!!! example "Пример PURL"

    ```
    pkg:maven/org.apache.logging.log4j/log4j-core@2.17.2
    ```

CodeScoring распознаёт и поддерживает следующие типы PURL в соответствии со спецификацией:

| Тип PURL       | Описание   | Спецификация            |
|----------------|---------|------------------|
| `cocoapods`    | Библиотеки для **Objective-C / Swift** через CocoaPods  | [CocoaPods Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/cocoapods-definition.md) |
| `conan`        | Пакеты экосистемы **C / C++ (Conan)**                   | [Conan Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/conan-definition.md)     |
| `conda`        | Пакеты экосистемы **Python / Conda**                    | [Conda Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/conda-definition.md)     |
| `nuget`        | Компоненты **.NET / NuGet**                             | [NuGet Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/nuget-definition.md)     |
| `golang`       | Пакеты **Go Modules**                                  | [Go Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/golang-definition.md)   |
| `maven`        | Артефакты **Java / Kotlin** (Maven / Gradle)           | [Maven Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/maven-definition.md)     |
| `npm`          | Пакеты **JavaScript / TypeScript**                     | [NPM Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/npm-definition.md)   |
| `composer`     | Пакеты **PHP (Composer)**                              | [Composer Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/composer-definition.md) |
| `pypi`         | Пакеты **Python (PyPI)**                               | [PyPI Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/pypi-definition.md)       |
| `gem`          | Пакеты **Ruby (RubyGems)**                             | [RubyGems Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/gem-definition.md)         |
| `cargo`        | Пакеты **Rust (Cargo)**                                | [Cargo Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/cargo-definition.md)     |
| `generic`      | Общий тип для произвольных бинарных или кастомных артефактов | [Generic Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/generic-definition.md)   |
| `apk`          | Системные пакеты **Alpine Linux**                      | [APK Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/apk-definition.md)         |
| `deb`          | Системные пакеты **Debian / Ubuntu**                   | [DEB Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/deb-definition.md)         |
| `rpm`          | Системные пакеты **RHEL / CentOS / Fedora**            | [RPM Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/rpm-definition.md)         |
| `swift`        | Пакеты **Swift Package Manager**                       | [Swift Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/swift-definition.md)     |
| `oci`          | Контейнерные образы **OCI / Docker**                   | [OCI Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/oci-definition.md)         |
| `docker`       | Образы **Docker Hub / Docker**                         | [Docker Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/docker-definition.md)   |
| `github`       | Репозитории **GitHub**                                 | [GitHub Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/github-definition.md)     |
| `huggingface`  | Модели **Hugging Face Hub**                            | [HuggingFace Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/huggingface-definition.md) |
| `mlflow`       | Модели **MLflow Model Registry**                       | [MLflow Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/mlflow-definition.md)   |
| `pub`          | Пакеты **Dart / Flutter (pub.dev)**                    | [Pub Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/pub-definition.md)         |
| `swid`         | **SWID-теги (Software Identification Tags)**           | [SWID Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/swid-definition.md)       |

Каждый компонент с PURL классифицируется по типу, который CodeScoring распознаёт при импорте SBOM-файлов. Тип указывается в поле `type` внутри описания компонента.

!!! example "Пример компонента в SBOM"

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

Поддерживаются следующие типы компонентов:

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

Поиск по хэшам подразумевает определение непосредственного включения библиотек в код проектов путём копирования. В рамках этого механизма происходит хэширование всех файлов проекта и сверка этих сигнатур с известными нам open source библиотеками.

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

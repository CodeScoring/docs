- [English](https://docs.codescoring.ru/supported-package-managers.en/index.md)

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
|                             | bun                                     | `bun.lock`                                                                                                                                                        |
| **Python**                  | pip                                     | `requirements.txt` `requirements.pip` `requires.txt` `pip-resolved-dependencies.txt` `pipdeptree.txt`                                                             |
|                             | Poetry                                  | `pyproject.toml` `poetry.lock`                                                                                                                                    |
|                             | Pipenv                                  | `Pipfile` `Pipfile.lock`                                                                                                                                          |
|                             | Conda                                   | `environment.yml` `meta.yml` `conda-lock.yml`                                                                                                                     |
|                             | uv                                      | `pyproject.toml` `uv.lock`                                                                                                                                        |
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

## Типы PURL и компонентов

Для унифицированного описания зависимостей CodeScoring использует стандарт **[Package URL (PURL)](https://github.com/package-url/purl-spec)**.

Пример PURL

```
pkg:maven/org.apache.logging.log4j/log4j-core@2.17.2
```

При анализе SBOM через [команду агента](/agent/scan-bom) или [импорте в платформу](/on-premise/how-to/projects/#sbom) CodeScoring распознаёт и поддерживает следующие типы PURL в соответствии со спецификацией:

| Тип PURL      | Описание                                                     | Спецификация                                                                                                     |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `cocoapods`   | Библиотеки для **Objective-C / Swift** через CocoaPods       | [CocoaPods Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/cocoapods-definition.md)     |
| `conan`       | Пакеты экосистемы **C / C++ (Conan)**                        | [Conan Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/conan-definition.md)             |
| `conda`       | Пакеты экосистемы **Python / Conda**                         | [Conda Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/conda-definition.md)             |
| `nuget`       | Компоненты **.NET / NuGet**                                  | [NuGet Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/nuget-definition.md)             |
| `golang`      | Пакеты **Go Modules**                                        | [Go Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/golang-definition.md)               |
| `maven`       | Артефакты **Java / Kotlin** (Maven / Gradle)                 | [Maven Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/maven-definition.md)             |
| `npm`         | Пакеты **JavaScript / TypeScript**                           | [NPM Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/npm-definition.md)                 |
| `composer`    | Пакеты **PHP (Composer)**                                    | [Composer Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/composer-definition.md)       |
| `pypi`        | Пакеты **Python (PyPI)**                                     | [PyPI Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/pypi-definition.md)               |
| `gem`         | Пакеты **Ruby (RubyGems)**                                   | [RubyGems Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/gem-definition.md)            |
| `cargo`       | Пакеты **Rust (Cargo)**                                      | [Cargo Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/cargo-definition.md)             |
| `generic`     | Общий тип для произвольных бинарных или кастомных артефактов | [Generic Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/generic-definition.md)         |
| `apk`         | Системные пакеты **Alpine Linux**                            | [APK Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/apk-definition.md)                 |
| `deb`         | Системные пакеты **Debian / Ubuntu**                         | [DEB Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/deb-definition.md)                 |
| `rpm`         | Системные пакеты **RHEL / CentOS / Fedora**                  | [RPM Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/rpm-definition.md)                 |
| `swift`       | Пакеты **Swift Package Manager**                             | [Swift Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/swift-definition.md)             |
| `oci`         | Контейнерные образы **OCI / Docker**                         | [OCI Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/oci-definition.md)                 |
| `docker`      | Образы **Docker Hub / Docker**                               | [Docker Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/docker-definition.md)           |
| `github`      | Репозитории **GitHub**                                       | [GitHub Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/github-definition.md)           |
| `huggingface` | Модели **Hugging Face Hub**                                  | [HuggingFace Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/huggingface-definition.md) |
| `mlflow`      | Модели **MLflow Model Registry**                             | [MLflow Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/mlflow-definition.md)           |
| `pub`         | Пакеты **Dart / Flutter (pub.dev)**                          | [Pub Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/pub-definition.md)                 |
| `swid`        | **SWID-теги (Software Identification Tags)**                 | [SWID Definition](https://github.com/package-url/purl-spec/blob/main/types-doc/swid-definition.md)               |

Каждый компонент с PURL классифицируется по типу, который CodeScoring распознаёт при импорте SBOM-файлов. Тип указывается в поле `type` внутри описания компонента.

Различие типов PURL и компонентов

Тип компонента описывает его функциональную роль внутри продукта — например, библиотека, фреймворк или встроенное ПО. Тип PURL, в свою очередь, определяет экосистему и источник, из которого этот компонент был получен.

Пример компонента в SBOM

```
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

- [Debian](https://www.debian.org/distrib/packages);
- [Alpine](https://docs.alpinelinux.org/user-handbook/0.1a/Working/apk.html);
- [RPM](https://rpm.org);
- [Astra Linux](https://astralinux.ru/);
- [ALT Linux](https://packages.altlinux.org/en/sisyphus/);
- [РЕД ОС](https://redos.red-soft.ru/).

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

Поиск по хэшам подразумевает определение непосредственного включения библиотек в код проектов путём копирования. В рамках этого механизма происходит хэширование всех файлов проекта и сверка этих сигнатур с известными нам open source библиотеками.

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

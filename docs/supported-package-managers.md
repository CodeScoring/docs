# Поддерживаемые пакетные менеджеры

## Манифесты

Для поиска зависимостей CodeScoring в первую очередь опирается на разбор файлов манифестов пакетных менеджеров. Система поддерживает разбор следующих форматов манифестов:


- Maven (Java)
    + `pom.xml`
    + `ivy.xml`
    + `*.gradle`
    + `*.gradle.kts`
    + `maven-dependency-tree.txt`
- npm (JavaScript)
    + `package.json`
    + `package-lock.json`
    + `npm-shrinkwrap.json`
    + `yarn.lock`
- PyPI (Python)
    + `setup.py`
    + `Pipfile`
    + `Pipfile.lock`
    + `pyproject.toml`
    + `poetry.lock`
    + `requirements.txt`
- Conan (C/C++)
    + `conanfile.txt`
- Go
    + `go.mod`
    + `go.sum`
- Packagist (PHP)
    + `composer.json`
    + `composer.lock`
- RubyGems (Ruby)
    + `Gemfile`
    + `Gemfile.lock`
    + `*.gemspec`
- Nuget
    + `*.nuspec`
    + `packages.lock.json`
    + `Project.json`
    + `Project.lock.json`
    + `packages.config`
    + `paket.dependencies`
    + `paket.lock`
    + `*.csproj`
    + `project.assets.json`
- CocoaPods
    + `Podfile`
    + `Podfile.lock`
    + `*.podspec`

Лучший результат будет при наличии основного файла манифеста и соответствующего lock-файла, если он предусмотрен механизмом пакетного менеджера.


## Механизм резолва при отсутствии lock-файла

При отсутствии lock-файла для некоторых пакетных индексов система будет пытаться выполнить резолв транзитивных OSS зависимостей сама следующим образом:

- Maven
    + для формата pom.xml генерация maven-dependency-tree через соответствующий плагин maven
    + используются Maven версии 3.8.3 и OpenJDK версии 11 такой-то
- PyPi
    + генерация poetry.lock с помощью пакетного менеджера Poetry
    + используется Python версии 3.8
- NPM
    + генерация yarn.lock с помощью пакетного менеджера Yarn
    + используется Node.js версии 16
- Nuget
    + для формата csproj генерация project.assets.json с помощью встроенных инструментов nuget
    + используется .NET SDK версии 5
- Packagist
    + генерация composer.lock с помощью пакетного менеджера Composer
    + используется PHP версии 8
- Rubygems
    + генерация Gemfile.lock с помощью пакетного менеджера Bundler
    + используется Ruby версии 3

Самостоятельная генерация lock-файлов системой не может давать результат в 100% случаев, так как результат часто зависит от окружения.

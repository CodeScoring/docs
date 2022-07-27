# Поддерживаемые пакетные менеджеры

## Манифесты

Для поиска зависимостей CodeScoring в первую очередь опирается на разбор файлов манифестов пакетных менеджеров. Система поддерживает разбор следующих форматов манифестов по экосистемам:


- Maven
    + `pom.xml`
    + `ivy.xml`
    + `maven-dependency-tree.txt`
- Gradle  
    + `*.gradle`
    + `*.gradle.kts`
    + `gradle.lockfile`
- NPM
    + `package.json`
    + `package-lock.json`
    + `npm-shrinkwrap.json`
    + `yarn.lock`
- PyPI
    + `setup.py`
    + `Pipfile`
    + `Pipfile.lock`
    + `pyproject.toml`
    + `poetry.lock`
    + `requirements.txt`
- Conan
    + `conanfile.txt`
- Go
    + `go.mod`
    + `go.sum`
- Packagist
    + `composer.json`
    + `composer.lock`
- RubyGems
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
    + для формата pom.xml и build.gradle генерация maven-dependency-tree через соответствующий плагин maven
    + используются Maven версии 3.8.3 и OpenJDK версии 11
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


## Механизм поиска зависимостей по хэшам

Второй механизм поиска зависимостей, реализованный в CodeScoring — это поиск по хэшам, то есть поиск непосредстсвенного включения библиотек в код проектов путём копирования. В рамках этого механизма происходит хэширование всех файлов проекта и сверка этих сигнатур с известными нам open source библиотеками.

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


От инсталляции в облако **не уходят** хэши файлов, размер которых не превышает 512 байт.
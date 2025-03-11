# Работа с зависимостями

## Создание lock и dep-tree файлов

## Java

При работе с Java можно создать дополнительные артефакты, содержащие полную структуру зависимостей проекта.

### Apache Maven:

#### `maven-dependency-tree.txt`

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

### Gradle:

#### `gradle-dependency-tree.txt`

```
./gradlew dependencies > gradle-dependency-tree.txt
```

После создания артефактов необходимо применить команду `scan file` для полученного артефакта, например:

``` bash
./johnny \
scan file ./maven-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```

## Scala

### sbt

#### `scala-dependency-tree.txt` или `sbt-dependency-tree.txt`

Для корректного выполнения композиционного анализа в проектах на Scala с использованием `sbt` выполните следующие шаги:

1. **Настройка ширины графа зависимостей**

    Чтобы сгенерировать полный граф зависимостей добавьте следующую строку в файл `build.sbt`:

    ```scala
    ThisBuild / asciiGraphWidth := 999999999
    ```

    Альтернативно, можно установить значение `asciiGraphWidth` глобально.

2. **Генерация дерева зависимостей**

    Выполните следующую команду для генерации дерева зависимостей:

    ```bash
    sbt clean compile "dependencyTree::toFile target/tree.txt"
    ```

    Убедитесь, что файл сохранен с именем `scala-dependency-tree.txt` или `sbt-dependency-tree.txt`, так как только эти имена поддерживаются для корректного парсинга.

3. **Сканирование сгенерированного файла**

    Флаг `--sbt-resolve` в команде сканирования в данном случае не нужен, поскольку выполняется сканирование уже сгенерированного дерева с полной структурой зависимостей.

## Golang (Go Modules)

### go

#### `go.sum`

1. Инициализируйте модуль (если еще не сделано):
   ```sh
   go mod init <module_name>
   ```
2. Установите зависимости:
   ```sh
   go get <package>
   ```
3. После установки зависимостей автоматически создаются и обновляются файлы `go.mod` и `go.sum`.
4. Закрепите версии зависимостей:
   ```sh
   go mod tidy
   ```

## Node.js (npm и yarn)

### npm

#### `package-lock.json`

1. Инициализируйте проект (если еще не сделано):
   ```sh
   npm init -y
   ```
2. Установите зависимости:
   ```sh
   npm install
   ```

### yarn

#### `yarn.lock`

1. Инициализируйте проект:
   ```sh
   yarn init -y
   ```
2. Установите зависимости:
   ```sh
   yarn install
   ```

## C# / .NET

### NuGet

#### `packages.lock.json`

1. Включите поддержку lock-файла (для .NET 5 и выше):
   ```sh
   dotnet nuget locals all --clear
   ```
2. Установите зависимости:
   ```sh
   dotnet restore --use-lock-file
   ```

### paket

#### `paket.lock`

1. Создайте lock-file:
   ```sh
   paket install
   ```

## PHP

### Composer

#### `composer.lock`

1. Инициализируйте проект (если еще не сделано):
   ```sh
   composer init
   ```
2. Установите зависимости:
   ```sh
   composer install
   ```

   или

   Создайте lock-file напрямую:
   ```sh
   composer update
   ```


## Python

### pip

#### `requirements.txt`

1. Установите зависимости и сохраните их в lock-файл:
   ```sh
   pip freeze > requirements.txt
   ```

### pipenv

#### `Pipfile.lock`

1. Установите pipenv (если еще не установлен):
   ```sh
   pip install pipenv
   ```
2. Создайте `Pipfile.lock`:
   ```sh
   pipenv install
   ```

### poetry

#### `poetry.lock`

Если файл `poetry.lock` еще не существует, Poetry создаст его автоматически при установке зависимостей. Если файл уже существует, он будет обновлен. Для этого выполните команду:

   ```bash
   poetry lock
   ```

Эта команда обновит зависимости, указанные в `pyproject.toml`, и создаст или обновит файл `poetry.lock`.

## Ruby

### Bundler 

### `Gemfile.lock`

1. Инициализируйте проект (если еще не сделано):
   ```sh
   bundle init
   ```
2. Установите зависимости:
   ```sh
   bundle install
   ```

   или

   Создайте lock-file напрямую:
   ```sh
   bundle lock
   ```

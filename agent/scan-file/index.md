- [English](https://docs.codescoring.ru/agent/scan-file.en/index.md)

# Сканирование файла

При необходимости сканирования отдельного манифеста внутри директории можно использовать команду `scan file`.

При запуске агент:

1. Идентифицирует формат указанного файла и производит разбор содержимого.
1. Формирует запрос к платформе для анализа содержимого.
1. После получения результатов отображает общую информацию о найденных манифестах, зависимостях, уязвимостях и сработавших политиках.
1. Дополнительно в текущей директории создается файл `bom.json`, содержащий полный Software Bill of Materials в формате **CycloneDX**.

В зависимости от параметров запуска агент возвращает соответствующий exit code:

- **0** – успешное сканирование, проблемы не были выявлены;
- **1** – в результате сканирования найдены проблемы, соответствующие настроенным [политикам безопасности](//on-premise/how-to/policies/), необходимо действие пользователя;
- **2** – ошибка сканирования;
- **3** – пустой результат, не были найдены артефакты для анализа. Возвращается только если параметр `--block-on-empty-result` имеет значение `true`.

## Пример запуска команды

Для сканирования только одного файла без обработки вложенных директорий или других манифестов, необходимо указать путь к файлу при запуске команды.

```
./johnny scan file path/to/file \
--api_token <api_token> \
--api_url <api_url>
```

## Параметры команды

Команда **scan file** имеет три уникальных параметра, помимо [общих настроек команды сканирования](/agent/scan/#_2):

- `--branch-or-tag` – ссылка на ветку или тег репозитория в формате `^refs/(heads|tags)/.+` (например, `refs/tags/v1.0`);
- `--commit` – указание хэша коммита;
- `--parser` – используемый парсер.

Для сводки доступных параметров команды и инструкции по использованию можно вызвать команду с флагом `-h, --help`.

## Доступные парсеры

| Технология      | Парсеры                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Conda**       | `conda.conda-lock_yml`, `conda.conda_yml_env`                                                                                                                                                                                                                                              |
| **Ruby**        | `ruby.gemfile`, `ruby.gemfile_lock`, `ruby.gemspec`                                                                                                                                                                                                                                        |
| **С#**          | `csharp.packages_lock_json`, `csharp.project_json`, `csharp.project_lock_json`, `csharp.dependencyreport_json`, `csharp.paket_dependencies`, `csharp.nuspec`, `csharp.csproj`, `csharp.packages_config`, `csharp.dotnet_csproj_env`, `csharp.project_assets_json`, `csharp.paket_lock`     |
| **PHP**         | `php.composer_json`, `php.composer_lock`, `php.composer_env`                                                                                                                                                                                                                               |
| **Python**      | `python.poetry_pyproject_toml_env`, `python.requirements_txt`, `python.pipfile`, `python.poetry_lock`, `python.pip-resolved-dependencies_txt`, `python.setup_py`, `python.pipfile_lock`, `python.pyproject_toml`, `python.pip_env`, `python.pipdeptree`, `python.uv_lock`                  |
| **C**           | `clang.conan_lock`, `clang.conanfile_txt`, `clang.conanfile_py`                                                                                                                                                                                                                            |
| **Go**          | `go.go_mod`, `go.go_sum`, `go.go_mod_env`                                                                                                                                                                                                                                                  |
| **Objective-C** | `objective_c.podfile`, `objective_c.podfile_lock`, `objective_c.podspec`                                                                                                                                                                                                                   |
| **Rust**        | `rust.cargo_toml`, `rust.cargo_lock`                                                                                                                                                                                                                                                       |
| **Java**        | `java.pom_xml`, `java.ivy_xml`, `java.maven-dependency-tree_txt`, `java.build_gradle_env`, `java.gradle-dependency-tree_txt`, `java.gradle_kts`, `java.gradle_lockfile`, `java.maven_pom_xml_env`, `java.jar`, `java.gradle`, `java.scala_build_sbt_env`, `java.scala-dependency-tree_txt` |
| **JS**          | `js.package_json`, `js.yarn_package_json_env`, `js.yarn_lock`, `js.pnpm_package_json_env`, `js.pnpm_lock_yaml`, `js.npm_package_json_env`, `js.package-lock_json`, `js.npm-shrinkwrap_json`                                                                                                |

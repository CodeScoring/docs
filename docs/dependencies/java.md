---
hide:
  - footer
---

# Работа с зависимостями в Java

## Apache Maven:

### Создание файла `maven-dependency-tree.txt`

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

## Gradle:

### Создание файла `gradle-dependency-tree.txt`

``` bash
./gradlew dependencies > gradle-dependency-tree.txt
```

### Создание файла `gradle-dependency-tree.txt` для мульти-проектных сборок

В мульти-проектных сборках Johnny в использует файл `gradle-dependency-tree.txt` для получения полного дерева зависимостей, включая все подмодули. Это стандартный механизм, позволяющий избежать дополнительных настроек или сложных конфигураций. Для его создания необходимо выполнить следующие действия:

#### Groovy

Добавить в файл `build.gradle` код:

```
subprojects {
    task CodeScoring_All_Dependencies(type: DependencyReportTask) {}
}
```

#### Kotlin

Добавить в файл `build.gradle.kts` код:

```
subprojects {
    tasks.register<DependencyReportTask>("CodeScoring_All_Dependencies"){}
}
```

После этого выполнить команду:

``` bash
./gradlew CodeScoring_All_Dependencies > gradle-dependency-tree.txt
```

После создания артефактов необходимо применить команду консольного агента [scan file](/agent/scan-file) для полученного результатов сканирования, например:

``` bash
./johnny \
scan file ./gradle-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```
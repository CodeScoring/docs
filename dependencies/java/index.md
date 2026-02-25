- [English](https://docs.codescoring.ru/dependencies/java.en/index.md)

# Работа с зависимостями в Java

## Apache Maven:

### Создание файла `maven-dependency-tree.txt`

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

## Gradle:

### Создание файла `gradle-dependency-tree.txt`

```
./gradlew dependencies > gradle-dependency-tree.txt
```

### Создание файла `gradle-dependency-tree.txt` для мульти-проектных сборок

Для анализа зависимостей в Gradle-проектах Johnny использует файл `gradle-dependency-tree.txt`. В обычных проектах он формируется автоматически. Однако в мульти-проектных сборках его корректное построение возможно только при наличии в проекте специальной задачи с ожидаемым именем.

Для получения всех зависимостей в таком случае необходимо произвести следующие действия:

### Связывание манифестов

- Если в директории находится build.gradle и gradle.lockfile без совпадения по имени они будут состыкованы;
- При наличии в одной директории всех трёх манифестов (build.gradle, gradle.lockfile, gradle-dependency-tree.txt) приоритет при связыванию отдаётся gradle-dependency-tree, gradle.lockfile в этом случае разбирается отдельно;
- При наличии в одной директории нескольких лок-файлов для одного build.gradle без совпадения по имени для связывания будет использован любой из них. Остальные лок-файлы разбираются отдельно.

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

```
./gradlew CodeScoring_All_Dependencies > gradle-dependency-tree.txt
```

После создания артефактов необходимо применить команду консольного агента [scan file](/agent/scan-file) для полученного результатов сканирования, например:

```
./johnny \
scan file ./gradle-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```

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

```
./gradlew dependencies > gradle-dependency-tree.txt
```

После создания артефактов необходимо применить команду консольного агента [scan file](/agent/scan-file) для полученного артефакта, например:

``` bash
./johnny \
scan file ./maven-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```

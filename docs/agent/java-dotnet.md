---
hide:
  - footer
---

# Улучшение композиционного анализа при работе с Java и .NET 

Поскольку механизмы пакетных менеджеров для Java и .NET не предусматривают включение транзитивных зависимостей в манифесты по умолчанию, для повышения качества композиционного анализа при работе с данными технологиями перед вызовом консольного агента необходимо создать дополнительные артефакты, содержащие полную структуру зависимостей проекта.

Команда для **Apache Maven**:

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

Команда для **Gradle**:

```
./gradlew dependencies > gradle-dependency-tree.txt
```

Команда для **.NET**:

```
dotnet list package --include-transitive --format-json >> dependencyReport.json
```

После создания артефактов необходимо применить команду `scan file` для полученного артефакта, например:

``` bash
./johnny \
scan file ./maven-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```
---
hide:
- footer
---
# Working with dependencies in Java

When working with Java, you can create additional artifacts that contain the full dependency structure of the project.

## Apache Maven:

### Generate `maven-dependency-tree.txt` file

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

### Gradle:

### Generate `gradle-dependency-tree.txt` file

```
./gradlew dependencies > gradle-dependency-tree.txt
```

After generating artifacts, you need to use the console agent command [scan file](/agent/scan-file.en) on the resulting artifact, for example:

``` bash
./johnny \
scan file ./maven-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```
---
hide:
- footer
---

# Working with dependencies in Java

When working with Java, you can create additional artifacts that contain the full dependency structure of the project.

## Apache Maven:

### Creating a `maven-dependency-tree.txt` file

```
mvn dependency:tree -DoutputFile=maven-dependency-tree.txt
```

## Gradle:

### Creating a `gradle-dependency-tree.txt` file

```
./gradlew dependencies > gradle-dependency-tree.txt
```

### Creating a  `gradle-dependency-tree.txt` file for multi-project builds

To analyze dependencies in Gradle projects, Johnny uses the `gradle-dependency-tree.txt` file. In regular projects, it is generated automatically. However, in multi-project builds, its correct generation is possible only if the project has a special task with the expected name.

To get all dependencies in this case, you need to do the following:

#### Groovy

Add to `build.gradle` file code:

```
subprojects {
    task CodeScoring_All_Dependencies(type: DependencyReportTask) {}
}

```
#### Kotlin

Add to `build.gradle.kts` file code:
```

subprojects {
    tasks.register<DependencyReportTask>("CodeScoring_All_Dependencies"){}
}
```

Execute command:

``` bash
./gradlew CodeScoring_All_Dependencies > gradle-dependency-tree.txt
```

After generating artifacts, you need to use the console agent command [scan file](/agent/scan-file.en) on the resulting artifact, for example:

``` bash
./johnny \
scan file ./gradle-dependency-tree.txt \
--api_token <api_token> \
--api_url <api_url>
```
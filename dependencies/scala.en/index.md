- [Русский](https://docs.codescoring.ru/dependencies/scala/index.md)

# Working with dependencies in Scala

## sbt

### Generating `scala-dependency-tree.txt` or `sbt-dependency-tree.txt` files

1. **Setting the width of the dependency graph**

   To generate a full dependency graph, add the following line to the `build.sbt` file:

   ```
   ThisBuild / asciiGraphWidth := 999999999
   ```

   Alternatively, you can set the `asciiGraphWidth` value globally.

1. **Generating dependency tree**

   Run the following command to generate dependency tree:

   ```
   sbt clean compile "dependencyTree::toFile target/tree.txt"
   ```

   Make sure to save the file with the name `scala-dependency-tree.txt` or `sbt-dependency-tree.txt`, as these are the only names supported for correct parsing.

1. **Scanning the generated file**

   The console agent option `--sbt-resolve` in the [scan command](/agent/scan.en) is not needed in this case, as it scans the already generated tree with the full dependency structure.

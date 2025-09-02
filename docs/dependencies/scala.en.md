---
hide:
- footer
---

# Working with dependencies in Scala

## sbt

### Generating `scala-dependency-tree.txt` or `sbt-dependency-tree.txt` files

1. **Setting the width of the dependency graph**

	To generate a full dependency graph, add the following line to the `build.sbt` file:

	```scala
	ThisBuild / asciiGraphWidth := 999999999
	```

	Alternatively, you can set the `asciiGraphWidth` value globally.

2. **Generating dependency tree**

	Run the following command to generate dependency tree:

	```bash
	sbt clean compile "dependencyTree::toFile target/tree.txt"
	```

	Make sure to save the file with the name `scala-dependency-tree.txt` or `sbt-dependency-tree.txt`, as these are the only names supported for correct parsing.

3. **Scanning the generated file**

	The console agent option `--sbt-resolve` in the [scan command](/agent/scan.en) is not needed in this case, as it scans the already generated tree with the full dependency structure.
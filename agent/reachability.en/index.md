- [Русский](../../agent/reachability/)

# Vulnerability reachability analysis

What is reachability

Reachability analysis checks whether a potentially vulnerable piece of code can actually be executed when using the application. This allows filtering out the "noise" and focusing on exploitable issues.

Johnny CLI agent can analyze whether vulnerabilities are reachable from source code.\
To use this feature, you need to set two parameters:

- `cg-path` — path to the Svace-format call graph;
- `cg-lang` — programming language for which the call graph was built. Currently, only `java` is supported.

## Building the call graph

### Using Svace

1. Download the Svace module `https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/#browse/browse:files:codescoring%2Fsvace-callgraph`

1. Obtain a user token in CodeScoring (`/cabinet/profile`)

1. Run Svace on the project's source code. This step is best performed within or after the build stage in your CI/CD pipeline.

1. Initialization

   ```
   svace init
   ```

1. Instrumented build

   ```
   svace build <build command> (e.g. svace build mvn clean package)
   ```

1. Analyze results and generate the call graph

   ```
   svace analyze --build-call-graph-only --license-server-url "http(s)://<codescoring_host>" --license-server-token "<token from step 1>"
   ```

1. Upon successful completion of all steps, a file named `.svace-dir/analyze-res/call-graph/<project_name>-graph-order.json` containing the call graph will appear in the project directory.

1. Launch the scan using Johnny, for example:

   ```
   johnny-linux-amd64 scan dir . --api_url "http(s)://<codescoring_host>" --api_token "<token from step 1>"  --cg-path .svace-dir/analyze-res/call-graph/<project_name>-graph-order.json  --cg-lang java
   ```

## Viewing results

In the vulnerabilities table, vulnerabilities with identified reachable call paths will be marked in the corresponding column:

Additionally, at the end of the report, another table listing the call trees for vulnerabilities will be available:

Example for a larger project:

If the `--save-results` flag was specified, reachability results will appear in the "Reachable" column of the vulnerabilities table:

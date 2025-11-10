---
hide:
  - footer
---

# Vulnerability reachability analysis

!!! info "What is reachability"
    Reachability analysis checks whether a potentially vulnerable piece of code can actually be executed when using the application.  This allows filtering out the "noise" and focusing on exploitable issues.

Johnny CLI agent can analyze whether vulnerabilities are reachable from source code.  
To use this feature, you need to set two parameters:

- `cg-path` — path to the Svace-format call graph;
- `cg-lang` — programming language for which the call graph was built. Currently supported values are `java`, `python` and `go`.

## Building the call graph

### Using Svace

1. Download the Svace module ```https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/#browse/browse:files:codescoring%2Fsvace-callgraph```
2. Obtain a user token in CodeScoring (`/cabinet/profile`)
3. Run Svace on the project's source code. This step is best performed within or after the build stage in your CI/CD pipeline.
   1. Initialization
      ```shell
      svace init
      ```
   2. Instrumented build
      ```shell
      svace build <build command> (e.g. svace build mvn clean package)
      ```
   3. Analyze results and generate the call graph
      ```shell
      svace analyze --build-call-graph-only --license-server-url "http(s)://<codescoring_host>" --license-server-token "<token from step 1>"  
      ```
4. Upon successful completion of all steps, a file named `.svace-dir/analyze-res/call-graph/<project_name>-graph-order.json` containing the call graph will appear in the project directory.
5. Launch the scan using Johnny, for example:
    ```shell
    johnny-linux-amd64 scan dir . --api_url "http(s)://<codescoring_host>" --api_token "<token from step 1>"  --cg-path .svace-dir/analyze-res/call-graph/<project_name>-graph-order.json  --cg-lang java
    ```

## Viewing results

In the vulnerabilities table, vulnerabilities with identified reachable call paths will be marked in the corresponding column:

![Vulnerabilities table with "Reachable" column](/assets/img/reachability/json-bug-vulnerabilities-table.png)

Additionally, at the end of the report, another table listing the call trees for vulnerabilities will be available:

![Reachability paths table for json-bug](/assets/img/reachability/json-bug-paths.png)

Example for a larger project:

![Reachability paths table for dep-track](/assets/img/reachability/dep-track-paths.png)

If the `--save-results` flag was specified, reachability results will appear in the "Reachable" column of the vulnerabilities table:

![Vulnerabilities table for json-bug](/assets/img/reachability/json-bug-ui-reachable-column.png)
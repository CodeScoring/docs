---
hide:
  - footer
---

# Scanning a directory

Scanning a directory is done using the `scan dir` subcommand.

During launching the agent:

1. Recursively goes through the entire contents of the specified directory (if a particular manifest is specified, it processes only that one)
 1. Identifies manifest files and parses them
 2. Hashes each file (when ran with `--with-hashes`)
2. Generates a request for installation
3. After receiving the result, it shows summary information on the found manifests, dependencies, vulnerabilities, triggered policies and more detailed information on each vulnerability and triggered policy
4. Additionally, a file `bom.json` is generated in the current directory, containing the complete Software Bill of Materials in the **CycloneDX** format.

Depending on the result of work and launch parameters, the agent returns the corresponding exit code.

By default, the agent traverses the contents of a directory recursively (including subdirectories). For non-recursive scanning, you need to add the `--no-recursion` option to the `scan dir` command.

## Request example

```bash
./johnny scan dir . \
--api_token <api_token> \
--api_url <api_url> \
--ignore .tmp --ignore fixtures --ignore .git
```


- [Русский](https://docs.codescoring.ru/agent/scan-technology/index.md)

# Scanning a technology

To make it easier to work with different ecosystems, the agent allows to scan individual technologies with a set of pre-defined settings. Scanning in this case is performed using the `scan <technology>` subcommand.

The behaviour of the agent during scanning is similar to that of the `scan dir` command, but has the following differences:

1. Directory traversal is always performed non-recursively (as when the `--no-recursion` flag is used in the `scan dir` command);
1. Only manifests belonging to the selected technology are processed;
1. All parsers of the selected technology are used, including dependency resolution in the environment. Other settings are ignored;

## List of supported technologies

Technologies are listed as they are used in the `scan <technology>` command:

- clang
- conda
- csharp
- go
- java
- js
- objective_c
- php
- python
- ruby
- rust

## Example of running the command

```
./johnny scan java . \
--api_token <api_token> \ .
--api_url <api_url>
```

You can call the command with the `-h, --help` flag to summarise the available command parameters and usage instructions.

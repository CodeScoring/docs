---
hide:
- footer
---

# Configuration via environment variables

The console agent parameters can be configured via environment variables. The [configuration file](/agent/config.en) structure is used for configuration via environment variables.

## Formation of environment variables

1. **Variable prefix**: All environment variables begin with the `JOHNNY_` prefix.
2. **Section path**: The variable is formed based on the section path in the configuration file. Section separators are replaced with the `_` symbol.
3. **Symbol replacement**: The `"."` and `"-"` symbols in section names are also converted to the `_` symbol.

### Example

Let's look at an example of setting the `block-on-empty-result` flag to block the build when an empty result is received:

- **Path in the configuration file**: `scan.general.block-on-empty-result`;
- **Environment variable**: `JOHNNY_SCAN_GENERAL_BLOCK_ON_EMPTY_RESULT`;

Thus, to change the value of this parameter through environment variables, you need to set the variable `JOHNNY_SCAN_GENERAL_BLOCK_ON_EMPTY_RESULT` with the desired value.

### Priority of settings

Since agent startup parameters can be configured in multiple ways, if two or more methods are used at the same time, the agent will accept parameters in the following priority order:

1. Value of the [scan-technology](/agent/scan-technology.en) command (if used);
2. Value of the command flag;
3. Value of [environment variable](/agent/env-variables.en);
4. Value from [config file](/agent/config.en).
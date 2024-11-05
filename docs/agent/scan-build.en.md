---
hide:
- footer
---

# Scanning a build for C and C++ languages

If the Conan package manager and corresponding manifests are not used to build a C/C++ project, Johnny can be run in a special mode to analyze the output of the build process to get a list of used libraries.

Johnny intercepts the build process, analyzing the compiler flags and identifying the libraries used. Then, using the system cache, the location of the libraries and their source are determined.

The version of the used library can be found if the library was dynamically linked. In this case, the agent analyzes the `.pc` file, which contains metadata about the component.

## Example of work

A `buildConfig` JSON file is added to the project, describing the sequence of commands for the build. For example:

```json
{
 //  Commands for execution
 "commands": [
    {
   // Command
   "command": "make",
   // Command execute parameters
   "flags_and_args": "clean"
  },
  {
   "command": "./configure"  
  },
  {
   "command": "make",
   // analyze this command
   "do_analyze": true
  }
 ]
}
```

Then the build analysis command is called and the path to the config file is specified:

```shell
./johnny scan build ./buildConfig.json
```

As a result of the work, the agent displays one of three codes:

- **0** – successful analysis, no problems were found in the build;
- **1** – problems were found in the build, action is required;
- **2** – analysis failed.

## Analysis command options

The **scan build** command has four options:

- `--build-result` – input is the result of the previous build process, including compiled artifacts.
- `-h, --help` – summary of available command options and usage instructions.
- `-L, --lib-versions string` – path to a JSON file with a list of versions of the libraries being analyzed.
- `--output string` – path to a file where the scan results will be saved.
- `-U, --unresolved-file string` – path to a file where information about libraries with unresolved versions will be saved.

---
hide:
  - footer
---

# Scanning a build for C and C++ languages using eBpf

The main difference between this command and the [scan build](/agent/scan-build.en/) command is that the analysis is not performed using the assembly tool protocol, but by monitoring the processes being started and their parameters using eBPF.
To work with eBpf, the command must be run with elevated privileges.

## Example of work

Command parameters and results are similar [scan build](/agent/scan-build.en/#_2) command

```shell
./johnny scan build ebpf ./buildConfig.json
```

For a summary of available command options and usage instructions, you can call the command with the `-h, --help` flag.

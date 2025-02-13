---
hide:
  - footer
---

# Scanning a technology

Scanning a directory is done using the `scan <tecnology>` subcommand.

Agent works in the same way as `scan dir` command with the following differences:
1. Always non-recursive scanning
2. Parses only selected technology manifest files
3. Enable all tecnology parsers, include resolving dependencies in the environment

## Supported technologies
  clang      
  conda       
  csharp      
  go          
  java        
  js          
  objective_c 
  php         
  python      
  ruby        
  rust        

## Request example

```bash
./johnny scan java . \
--api_token <api_token> \
--api_url <api_url> 
```

For a summary of available command parameters and usage instructions, you can call the command with the `-h, --help` flag.
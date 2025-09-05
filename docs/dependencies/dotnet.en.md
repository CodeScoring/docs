---
hide:
- footer
---

# Working with dependencies in .NET

## NuGet

### Creating a `packages.lock.json` file

1. Enable lock-file support (for .NET 5 and above):
	```sh
	dotnet nuget locals all --clear
	```

2. Install dependencies:
	```sh
	dotnet restore --use-lock-file
	```

### Creating a `paket.lock` file

1. Create a lock-file:
	```sh
	paket install
	```

### Working with an `sln` manifest

In case an *.sln manifest is detected while scanning a directory the list of target manifests will be composed of the components described in it. The components which are present in the solution directory but not included will be ignored.

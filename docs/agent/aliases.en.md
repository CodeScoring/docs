---
hide:
- footer
---

# Processing selective dependency resolution

In case of [selective dependency resolution](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) in manifest files, the console agent can detect these changes and work with them.

## Examples of NPM selective dependency resolutions

### Package substitution (`name@version`)

**Input data**

`package.json`
```json
"resolutions": {
"@parcel/watcher": "npm:@favware/skip-dependency@latest"
}
```

`yarn.lock`
```yaml
dependencies:
"@parcel/watcher": "npm:2.1.0"
```

**Final dependency resolution**

```yaml
"@parcel/watcher@npm:@favware/skip-dependency@latest":
version: 1.2.2
resolution: "@favware/skip-dependency@npm:1.2.2"
```

- Package name remains the same;
- There are no references to constraint in the package data (constraint is only specified in `resolutions` in `package.json`);
- The resulting version matches the version of the replaced package;
- Full information about the resulting package is contained in the `resolution` entry.

### Fixing the version

**Input data**

`package.json`
```json
"resolutions": {
"http-signature": "1.3.4"
}
```

`yarn.lock`
```yaml
dependencies:
http-signature "~1.2.0"
```

**Final dependency resolution**

```yaml
http-signature@1.3.4, http-signature@~1.2.0:
version "1.3.4"
resolved "https://registry.yarnpkg.com/http-signature/-/http-signature-1.3.4.tgz#a65b41193110b222364e776fd1ac848655a0e2f0"
```

- The package name remains the same;
- The final package description takes into account all constraints from other package dependencies, including `1.3.4` specified in `package.json`;
- Full information about the resulting package is contained in the `resolved` entry.

### Fixing version with multiple dependencies

**Input**

`package.json`
```json
"resolutions": {
"yaml": "2.2.2"
}
```

`yarn.lock`
```yaml
dependencies:
yaml: ^1.10.0
yaml: ^2.2.1
yaml: ^1.7.2
yaml: ^1.10.2
yaml: ^2.3.4
yaml: 2.3.1
yaml: ^2.1.1
```

**Final dependency resolution**

```yaml
"yaml@npm:2.2.2":
version: 2.2.2
resolution: "yaml@npm:2.2.2"
```

- Package name remains the same;
- The final package description does not contain constraints from other package dependencies - only `resolutions` from `package.json` are taken into account;
- Full information about the resulting package is contained in the `resolution` entry.
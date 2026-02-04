---
hide:
- footer
---

# Supported protocols

This section contains data formats and response modification rules for each supported package manager in OSA Proxy.

## Maven

### Processed files

- `maven-metadata.xml` - version information manifest
- `.jar`, `.war`, `.ear` - package files

### maven-metadata.xml field modifications

```xml
<metadata>
  <groupId>...</groupId>
  <artifactId>...</artifactId>
  <versioning>
    <latest>updated to latest unblocked</latest>
    <release>updated to latest unblocked</release>
    <versions>
      <version>blocked versions are removed</version>
    </versions>
  </versioning>
</metadata>
```

## NPM

### Files processed

- Package JSON manifest (path `/{repository}/*`)
- `.tgz` - package archives

### NPM Manifest field modifications

```json
{
  "name": "package-name",
  "dist-tags": {
    "latest": "updated to latest unblocked version"
  },
  "versions": {
    "1.0.0": "blocked versions are removed"
  },
  "time": {
    "1.0.0": "entries for blocked versions are removed"
  }
}
```

## PyPI

### Files and resources

- Simple API HTML pages (path `/{repository}/simple/*`)
- `.zip`, `.tar`, `.tgz`, `.tar.gz`, `.tar.bz2`, `.egg`, `.whl` - package files

### HTML page modifications

- Elements for blocked versions are removed
- URLs are rewritten for proxy downloading

```html
<!DOCTYPE html>
<html>
  <body>
    <a href="https://files.pythonhosted.org/packages/example-1.0.0.tar.gz">example-1.0.0.tar.gz</a>
    <a href="https://files.pythonhosted.org/packages/example-2.0.0.tar.gz">example-2.0.0.tar.gz</a>
  </body>
</html>
```

## NuGet

### Handled resources

- `index.json` - service index
- Registration index JSON
- `.nupkg` - package files

### Registration index modifications

```json
{
  "version": "3.0.0",
  "items": [
    {
      "@id": "https://api.nuget.org/v3/registration5-gz-semver2/package/index.json",
      "items": [
        {
          "catalogEntry": {
            "id": "Package",
            "version": "1.0.0"
          }
        },
        {
          "catalogEntry": {
            "id": "Package",
            "version": "2.0.0"
          }
        }
      ]
    }
  ]
}
```

## Go

### Processed files

- Version list (`/@v/list`)
- `.zip` — module archives

### Version list modifications

- Blocked versions are removed from the version list

## Debian

### Processed files

- `.deb` — package files

!!! warning "Debian scanning specifics"

    For Debian, only package scanning is supported. Modification of manifests (`Packages` files) is not performed.

## Alpine

### Processed files

- `.apk` — package files

!!! warning "Alpine scanning specifics"

    For Alpine, only package scanning is supported. Modification of indexes (APKINDEX) is not performed.

## RPM

### Processed files

- `.rpm` — package files

!!! warning "RPM scanning specifics"

    For RPM, only package scanning is supported. Modification of metadata (repodata) is not performed.

## Docker

### Processed files

- Manifests (v2 API)

### Manifest modification

- Digests of blocked images are removed from multi-architecture manifests (Manifest Lists).

## Behavior in case of complete package blocking

In a scenario where all available versions of a requested package are blocked by security policies, OSA Proxy returns a message indicating that all versions are blocked.

Since some package manager clients might not display this specific blocking message in the user interface, it is recommended to use the `curl` utility for direct diagnosis of the package status. Below are examples of `curl` requests to check the blocking status for various package types:

### Pip

```bash
curl http://localhost:8080/codescoring-pypi/simple/package_name
```

### Maven

```bash
curl http://localhost:8080/codescoring-maven/groupid/artifactid/maven-metadata.xml
```

### npm

```bash
curl http://localhost:8080/codescoring-npm/package_name
```

### NuGet

Although the NuGet client might display the reason for blocking all packages in the console, a direct `curl` request also allows for status confirmation:
```bash
curl http://localhost:8080/codescoring-nuget/nuget-api/v3/registration5-gz-semver2/newtonsoft.json/index.json
```

### Go

```bash
curl http://localhost:8080/codescoring-go/module_name/@v/list
```
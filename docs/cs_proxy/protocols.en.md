---
hide:
- footer
---

# Supported protocols

This section contains data formats and response modification rules for each supported package manager.

## Maven

### Processed Files

- `maven-metadata.xml` - version information manifest
- `.jar`, `.war`, `.ear` - package files
- `.sha1`, `.md5` - checksum files

### maven-metadata.xml Field Modifications

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

### Files Processed

- Package JSON manifest (path `/{repository}/*`)
- `.tgz` - package archives

### NPM Manifest Field Modifications

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

### Files and Resources

- Simple API HTML pages (path `/{repository}/simple/*`)
- `.zip`, `.tar`, `.tgz`, `.tar.gz`, `.tar.bz2`, `.egg`, `.whl` - package files

### HTML Page Modifications

- `<a>` elements for blocked versions are removed
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

### Handled Resources

- `index.json` - service index
- Registration index JSON
- `.nupkg` - package files

### Registration Index Modifications

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

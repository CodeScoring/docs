---
hide:
- footer
---
# Working with dependencies in JavaScript

## NPM

### Creating a `package-lock.json` file

1. Initialize the project:
```sh
npm init -y
```
2. Install dependencies:
```sh
npm install
```

### Support for the NPM package alias mechanism

The [NPM package alias](https://docs.npmjs.com/cli/v8/using-npm/package-spec#aliases) mechanism allows you to install packages under different names, which is convenient for using multiple versions of a library at the same time, replacing a dependency without changing its name in the code, and working with forks.

Instead of the standard version specification, a syntax is used that explicitly specifies which package and its version to install under the desired name. This simplifies testing, updates, and dependency compatibility.

In `package.json`, the dependencies section may contain the following entry:

```json
"dependencies": {
"@babel/legacy-core": "npm:@babel/core@=7.12.0"
}
```

The Johnny console agent handles this entry correctly, recognizing that **@babel/legacy-core** is an alias for **@babel/core** version 7.12.0. The original package is taken into account during dependency analysis, preventing errors related to non-existent names.

### Support for the NPM overrides mechanism

The [NPM overrides](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#overrides) mechanism allows you replacing the version of a dependency with a known security issue, replacing an existing dependency with a fork.

In `package.json`, the overrides section may contain the following entry:

```json
"overrides": {
  "foo": "1.0.0"
}
```

### Support for the NPM workspaces mechanism

The [NPM workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces) mechanism allows you support managing multiple packages from your local file system from within a singular top-level, root package.

In `package.json`, the workspaces section may contain the following entry:

```json
"workspaces": [ "packages/a", "packages/b" ]
```

The Johnny console agent process all valid `package.json` from workspaces together.

## PNPM

### Creating a `pnpm-lock.yaml` file

1. Initialize the project:
   ```sh
   pnpm init -y
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```

### Support for the PNPM overrides mechanism

The PNPM overrides mechanism allows you replacing the version of a dependency with a known security issue, replacing an existing dependency with a fork.

In `package.json`, the pnpm/overrides section may contain the following entry:

```json
"pnpm": {
  "overrides": {
    "example-package": "^1.3.0"
  }
}
```

### Support for the PNPM workspaces mechanism

The [PNPM workspaces](https://pnpm.io/pnpm-workspace_yaml) mechanism allows you support managing multiple packages from your local file system from within a singular top-level, root package.

In `pnpm-workspace.yaml` in folder with root package `package.json` may contain the following entry:

```yaml
packages:
- 'packages/*'
```

The Johnny console agent process all valid `package.json` from workspaces together.

## Yarn

### Creating a `yarn.lock` file

1. Initialize the project:
```sh
yarn init -y
```
2. Install dependencies:
```sh
yarn install
```

### Support for Yarn's selective dependency resolution mechanism

Yarn supports [selective version resolution](https://classic.yarnpkg.com/lang/en/docs/selective-version-resolutions/) via the `resolutions` field in `package.json`, allowing you to specify specific versions of dependencies without editing `yarn.lock`.

This mechanism is useful if you need to update a sub-dependency that is not updated frequently, fix a vulnerability in a transitive dependency, or lock a version due to a problematic update.

CodeScoring supports handling this mechanism in the Johnny console agent. Here are some scenarios for its operation:

#### Replacing a package

To replace a package via the resolutions mechanism, the following entry is added to `package.json`. In this example, the **parcel/watcher** package is replaced with the **favware/skip-dependency** package.

```json
"resolutions": {
"@parcel/watcher": "npm:@favware/skip-dependency@latest"
}
```

The corresponding entry in the `yarn.lock` file for this package will be as follows:

```yaml
dependencies:
"@parcel/watcher": "npm:2.1.0"
```

When installing, the build uses the **favware/skip-dependency** package version 1.2.2. The console agent correctly identifies this mechanism and analyzes the final package.

```yaml
"@parcel/watcher@npm:@favware/skip-dependency@latest":
version: 1.2.2
resolution: "@favware/skip-dependency@npm:1.2.2"
```

#### Fixing the version of a transitive dependency

To fix the version via the resolutions mechanism, the following entry is added to `package.json`. In this example, the version of the **http-signature** package is fixed to **1.3.4**.

```json
"resolutions": {
"http-signature": "1.3.4"
}
```

The entries in the `yarn.lock` file corresponding to this package will be as follows:

```yaml
dependencies:
http-signature "~1.2.0"
```

When installing, the build will use version **http-signature 1.3.4**. The console agent analyzes the final version of the package.

```yaml
http-signature@1.3.4, http-signature@~1.2.0:
version "1.3.4"
resolved "https://registry.yarnpkg.com/http-signature/-/http-signature-1.3.4.tgz#a65b41193110b222364e776fd1ac848655a0e2f0"
```

#### Fixating the version with multiple dependencies

To fixate the version with multiple dependencies, the following entry is added to `package.json` via the resolutions mechanism. In this example, the version of the **yaml** package is fixated to **2.2.2**.

```json
"resolutions": {
"yaml": "2.2.2"
}
```

The entries in `yarn.lock` corresponding to this package will be as follows:

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

When installing, the build will use version **2.2.2**. The console agent analyzes only the package version fixated in `resolutions`.

```yaml
"yaml@npm:2.2.2":
version: 2.2.2
resolution: "yaml@npm:2.2.2"
```
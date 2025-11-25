---
hide:
  - footer
---

# Base64 URL Parameters

## Using Base64 URL Parameters for `osa-proxy`

In certain scenarios, interacting with `osa-proxy` requires explicitly specifying additional parameters in the URL path. This is achieved by encoding the required information in Base64 (URL-safe) format.

The primary purpose of using Base64-encoded parameters is to provide `osa-proxy` with the necessary context to correctly apply security policies, especially when `osa-proxy` acts as an intermediary for external repositories.

### Automatic Context Detection

When `osa-proxy` is placed between a client (package manager) and an internal repository manager (e.g., JFrog Artifactory or Nexus Repository Manager), `osa-proxy` can automatically extract the host and repository name from the downstream repository settings.

Example configuration where context is automatically determined:

```yaml
npm:
  repository:
    - name: codescoring-npm
      # ...
      registry: https://nexus.test.ru/repository/npm-proxy
```

### Explicit Context Specification via Base64 Parameters

In cases where `osa-proxy` directly interacts with external, public repositories (e.g., `https://registry.npmjs.org`), it cannot independently retrieve information about the internal host and repository name. In this situation, it is critical for `osa-proxy` to receive this data to apply linked security policies and process the request correctly.

For this purpose, a Base64-encoded string is used, which contains a JSON object with parameters such as `repoManagerHost` and `repoName`. This string is embedded directly into the request URL, allowing `osa-proxy` to obtain the necessary context.

Example configuration requiring explicit context specification:

```yaml
npm:
  repository:
    - name: codescoring-npm
      # ...
      registry: https://registry.npmjs.org # Parameter passing is required here
```

### How it works:

The Base64-encoded parameter string is placed in the URL path immediately after the repository name. `osa-proxy` decodes this string, extracts the parameters, and uses them to perform its functions, including applying security policies associated with a specific internal repository.

General URL Structure:
`https://<osaproxy-host>/<repository-name>/<base64-parameters>/<rest-of-path>`

## Passing Context for Correct Operation of Security Policies Linked to Nexus and Artifactory Repositories

`Developer Client` -> `Nexus / Artifactory` -> `osa-proxy` -> `Internet`

To pass contextual information, including the host and repository name of your repository manager, this data should be integrated into a Base64-encoded parameter string. It is important to strictly adhere to the rule that this Base64 string must be placed immediately after the repository name in the URL.

### Nexus

1.  Go to **Server Administration** -> **Repositories**.
2.  Select the desired type (e.g., `maven2 (proxy)`).
3.  In the **Remote storage** field, enter the URL of your `osa-proxy` instance, including the repository name and Base64-encoded parameters.

Example for a Maven proxy repository:
`https://osaproxy.example.com/internet-maven/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL3JlcG8xLm1hdmVuLm9yZy9tYXZlbjIiLCJyZXBvTmFtZSI6ImludGVybmV0LW1hdmVuIn0/maven2`

### Artifactory

1.  Go to **Administration** -> **Repositories** -> **Remote**.
2.  In the configuration, set the **URL** field to the `osa-proxy` URL. This URL must include the repository name and the Base64-encoded string.

Example for a remote PyPI repository:
`https://osaproxy.example.com/internet-pypi/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL3B5cGkub3JnL3NpbXBsZSIsInJlcG9OYW1lIjoiaW50ZXJuZXQtcHlwaSJ9/simple`


## Rule

The Base64-encoded parameter string must be placed in the URL path immediately after the repository name.

The general URL structure is as follows:
`https://<osaproxy-host>/<repository-name>/<base64-parameters>/<rest-of-path>`

Where:

- `<osaproxy-host>`: The hostname of the `osa-proxy` instance.
- `<repository-name>`: The name of the repository being accessed.
- `<base64-parameters>`: A URL-safe Base64-encoded JSON string containing the parameters.
- `<rest-of-path>`: The remaining part of the path from the package manager settings.

## Example

For example, to pass the following parameters as a JSON object:
```json
{"repoManagerHost":"https://nexus.test.ru","repoName":"npm-proxy"}
```

To do this, you should:

1.  **Convert the JSON object to a string.**
2.  **Encode the string using URL-safe Base64.**

The result of encoding the above JSON object in Base64:
`eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9`

## Configuring Package Managers

To permanently use the URL with Base64 parameters for all requests, update your package manager's configuration file.

### NPM

For NPM, edit `.npmrc` file and set the `registry` key.

The URL should include the repository name and the Base64 encoded string.

```text
registry=https://osaproxy.example.com/npm-proxy/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9
```

### Maven

For Maven, edit `settings.xml` file. You can add a new `<mirror>` in the `<mirrors>` section.

The `<url>` tag should contain the full URL, including the repository name and the Base64 encoded string.

```xml
<settings>
  ...
  <mirrors>
    <mirror>
      <id>osa-proxy-mirror</id>
      <mirrorOf>*</mirrorOf>
      <url>https://osaproxy.example.com/my-maven-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9/maven2</url>
    </mirror>
  </mirrors>
  ...
</settings>
```

Make sure the `<mirrorOf>` value matches the repositories you want to proxy.

### Go

For Go, set the `GOPROXY` environment variable to include the repository name and the Base64-encoded string.

```bash
export GOPROXY="https://osaproxy.example.com/go-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6ImdvLXJlcG8ifQ"
```

### Debian

For Debian, edit `/etc/apt/sources.list` or a file in `/etc/apt/sources.list.d/`. Update the `URIs` field.

```
Types: deb
URIs: https://osaproxy.example.com/debian-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6ImRlYmlhbi1yZXBvIn0=
Suites: stable
Components: main
Signed-By: /path/to/key.gpg
```

### NuGet

For NuGet, edit `NuGet.config` file and add a new package source. The `value` attribute of the `<add>` tag should contain the full URL.

```xml
<configuration>
  <packageSources>
    <add key="osa-proxy" value="https://osaproxy.example.com/nuget-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im51Z2V0LXJlcG8ifQ/index.json" />
  </packageSources>
  ...
</configuration>
```

### PyPI

For PyPI, edit `pip.conf` (Linux/macOS) or `pip.ini` (Windows) file and set the `index-url`.

```ini
[global]
index-url = https://osaproxy.example.com/pypi-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6InB5cGktcmVwbyJ9/simple
```

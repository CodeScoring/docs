# Base64 URL Parameters

In some scenarios, requests to `osa-proxy` require specifying additional parameters directly in the URL path. This is achieved by passing a URL-safe Base64 encoded string.

## Rule

The Base64 encoded parameter string must be placed in the URL path immediately after the repository name.

The general URL structure is as follows:
`https://<osaproxy-host>/<repository-name>/<base64-parameters>/<rest-of-path>`

Where:
- `<osaproxy-host>`: The hostname of the `osa-proxy` instance.
- `<repository-name>`: The name of the repository being accessed.
- `<base64-parameters>`: A URL-safe Base64 encoded JSON string containing the parameters.
- `<rest-of-path>`: The remainder of the original request path to the artifact.

## Example

Suppose you need to pass the following parameters as a JSON object:

```json
{"repoManagerHost":"https://nexus.test.ru","repoName":"npm-proxy"}
```

1.  **Convert the JSON object to a string.**
2.  **Encode the string using URL-safe Base64.**

The Base64 encoding of the above JSON object is:
`eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9`

An example request to an NPM repository might look like this:

`https://osaproxy.example.com/npm-proxy/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9/some/package`

This rule is applicable for all supported package managers. For example, for Maven, the URL could be:

`https://osaproxy.example.com/my-maven-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9/com/mycompany/app/my-app/1.0/my-app-1.0.pom`

## Package Manager Configuration

To permanently use the URL with Base64 parameters for all requests, you need to update your package manager's configuration file.

### NPM

For NPM, you need to edit your `.npmrc` file and set the `registry` key.

The URL should include the repository name and the Base64 encoded string.

```text
registry=https://osaproxy.example.com/npm-proxy/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9
```

### Maven

For Maven, you need to edit your `settings.xml` file. You can add a new `<mirror>` in the `<mirrors>` section.

The `<url>` tag should contain the full URL, including the repository name and the Base64 encoded string.

```xml
<settings>
  ...
  <mirrors>
    <mirror>
      <id>osa-proxy-mirror</id>
      <mirrorOf>*</mirrorOf>
      <url>https://osaproxy.example.com/my-maven-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im5wbS1wcm94eSJ9</url>
    </mirror>
  </mirrors>
  ...
</settings>
```

Make sure the `<mirrorOf>` value matches the repositories you want to proxy.

### Go

For Go, set the `GOPROXY` environment variable to include the repository name and the Base64 encoded string.

```bash
export GOPROXY="https://osaproxy.example.com/go-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6ImdvLXJlcG8ifQ"
```

### Debian

For Debian, you need to edit your `/etc/apt/sources.list` or a file in `/etc/apt/sources.list.d/`. Update the `URIs` field.

```
Types: deb
URIs: https://osaproxy.example.com/debian-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6ImRlYmlhbi1yZXBvIn0=
Suites: stable
Components: main
Signed-By: /path/to/key.gpg
```

### NuGet

For NuGet, edit your `NuGet.config` file and add a new package source. The `value` attribute of the `<add>` tag should contain the full URL.

```xml
<configuration>
  <packageSources>
    <add key="osa-proxy" value="https://osaproxy.example.com/nuget-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6Im51Z2V0LXJlcG8ifQ/index.json" />
  </packageSources>
  ...
</configuration>
```

### PyPI

For PyPI, edit your `pip.conf` (Linux/macOS) or `pip.ini` (Windows) file and set the `index-url`.

```ini
[global]
index-url = https://osaproxy.example.com/pypi-repo/eyJyZXBvTWFuYWdlckhvc3QiOiJodHRwczovL25leHVzLnRlc3QucnUiLCJyZXBvTmFtZSI6InB5cGktcmVwbyJ9/simple
```


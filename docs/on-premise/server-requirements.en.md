---
hide:
  - footer
---

# Hardware requirements

## Operating system

Installation of the on-premise version is possible on **GNU/Linux** distributions.

## Server resources

Minimum requirements to run: **16Gb RAM, 8 CPU cores**.

Recommended requirements: **32Gb RAM, 16 CPU cores**.

Additionally, make sure that the space where the directory with docker data is located (data-root docker, by default /var) has at least **20Gb of memory**. At the same time, for smooth operation of the system, it is necessary to reserve **disk space based on the size of the analyzed repositories, multiplied by three**.

## Supported versions of external services

When using your own database instances, make sure that their versions meet the requirements below:

### Redis

- Minimum version: **7.0.0**
- Tested version: **7.4.3**

### PostgreSQL

- Minimum version: **13.x** (any minor)
- Tested version: **13.21**

Using other major branches does not guarantee correct results and may lead to errors or performance degradation.

## External requests

To install the system, the Docker Registry with CodeScoring container images must be available, the address of which is provided along with the activation key.

For correct operation, the address `index.codescoring.ru` with a constantly updated database of known packages must also be available. 

From the Index API the installation receives additional information on the dependencies found, their licenses and vulnerabilities.

The general architecture of the work is shown in the image below.

![CodeScoring on-premise architecture](/assets/img/on-premise-architecture-en.png)

The source code is not transferred from the installation to the CodeScoring cloud. However, to obtain information on dependencies and control licensing terms, the following is sent:

1. anonymized information on found package manager manifests and their contents;
2. hashes of source code files to search for direct inclusions of Open Source libraries in project code;
3. number of active authors over the past year;
4. number of projects in the system;
5. installation version.

The paths of the manifests and the names of the hashed files are specifically anonymized. The hashes of files whose size does not exceed **512 bytes** are not being sent from the installation to the cloud.

An example of a request from an installation to the Index API with data from package manager manifests:


```json
[
 {
 "path": "114bc73d-a9ba-433d-9a3e-f2b29d822204",
 "type": "file",
 "extension": ".txt",
 "result": {
 "platform": "pypi",
 "dependencies": [
 {
 "name": "django",
 "requirement": "==3.0.0",
 "resolved_requirement": "3.0.0",
 "env": "dev"
 }
 ],
 "kind": "manifest",
 "success": true,
 "extra": {}
 }
 },
 {
 "path": "efde2364-dc0c-45a9-905a-a487b3361ac7",
 "type": "file",
 "extension": ".xml",
 "result": {
 "platform": "maven",
 "dependencies": [
 {
 "name": "org.liquibase:liquibase-core",
 "requirement": "3.6.2",
 "resolved_requirement": "3.6.2",
 "env": "compile"
 },
 {
 "name": "xpp3:xpp3",
 "requirement": "1.1.4c",
 "resolved_requirement": "1.1.4c",
 "env": "compile"
 }
 ],
 "kind": "manifest",
 "success": true,
 "extra": {}
 }
 },
 {
 "path": "49dd4c09-b5de-474a-998a-3ce0a94a5221",
 "type": "file",
 "extension": ".txt",
 "result": {
 "platform": "pypi",
 "dependencies": [
 {
 "name": "apt-wrapper",
 "requirement": "==1.18",
 "resolved_requirement": "1.18",
 "env": "runtime"
 },
 {
 "name": "django",
 "requirement": "==2.0.0",
 "resolved_requirement": "2.0.0",
 "env": "runtime"
 },
 {
 "name": "text-unidecode",
 "requirement": "==1.3",
 "resolved_requirement": "1.3",
 "env": "runtime"
 }
 ],
 "kind": "manifest",
 "success": true,
 "extra": {}
 }
 }
]
```

An example of a request from the installation to the Index API with data on hashes of source code files:


```json
[
 {
 "id": "ca028ad9-0676-4c85-a5b0-9bf81fba6fcc",
 "ext": ".xml",
 "sha256": "e01c736a351633932e8b3ed041e553f67968e07d35d2c153b02b60e910a8c433"
 }
]
```
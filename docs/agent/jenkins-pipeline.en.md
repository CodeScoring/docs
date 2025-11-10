---
hide:
  - footer
---

# Integration into Jenkins Pipeline

The CLI agent supports integration into Jenkins in two ways: through `Jenkinsfile` and a specialized plugin.

## Adding agent to Jenkinsfile

### Using a Docker image

An example of adding agent to a `pipeline` using a Docker image:

```groovy
pipeline {
 agent any

 environment {
 CODESCORING_REGISTRY_URL='REGISTRY_URL'
 CODESCORING_AGENT_IMAGE='REGISTRY_URL/johnny-depp:<version>'
 CODESCORING_REGISTRY_CREDENTIALS=credentials('cs-registry-creds')
 CODESCORING_API_URL='https://localhost:8080'
 }

 stages {

 stage("Login to Codescoring docker registry") {
 steps {
 sh """
 docker login -u "$CODESCORING_REGISTRY_CREDENTIALS_USR" "$CODESCORING_REGISTRY_URL" -p "$CODESCORING_REGISTRY_CREDENTIALS_PSW"
 """
 }
 }

 stage('Run CodeScoring Agent') {
 steps {
 sh """
 docker run -v \$(pwd):/code --rm ${CODESCORING_AGENT_IMAGE} --api_token ${CODESCORING_API_TOKEN} --api_url ${CODESCORING_API_URL} --ignore .tmp --ignore fixtures --ignore .git .
 """
 }
 }
 }
}
```

### Using a binary file

To use the console agent binary file, you must first perform the following steps on the Jenkins machine:

1. Download the file with the command

 ```bash
 wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
 ```

 or

 ```bash
 curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@REGISTRY_URL/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
 ```

 The `JOHNNY_VERSION` variable must be replaced with the agent version. A list of current versions is available [in the Changelog section](//changelog/johnny-changelog.en).

 The `REGISTRY_URL`, `REGISTRY_USERNAME` and `REGISTRY_PASSWORD` variables should be replaced with the URL, login and password received from the vendor.

2. Allow file execution

```bash
 chmod +x /usr/local/bin/johnny
```

An example of executing the binary file in `pipeline`:

```groovy
pipeline {
 agent any

 environment {
 CODESCORING_API_URL='http://localhost:8001'
 CODESCORING_API_TOKEN='API_TOKEN'
 }

 stages {

 stage('Run CodeScoring Agent') {
 steps {
 sh """
 johnny scan dir --api_token ${CODESCORING_API_TOKEN} --api_url ${CODESCORING_API_URL} --ignore .tmp --ignore fixtures --ignore .git .
 """
 }
 }
 }
}
```
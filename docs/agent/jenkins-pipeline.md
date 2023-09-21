---
hide:
  - footer
---

# Добавление в Jenkins pipeline

Консольный агент поддерживает добавление в Jenkins Pipeline.

Пример для добавления в `pipeline`:

```groovy
pipeline {
    agent any

  environment {
    CODESCORING_REGISTRY_URL='registry-one.codescoring.ru'
    CODESCORING_AGENT_IMAGE='registry-one.codescoring.ru/johnny-depp:<version>'
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
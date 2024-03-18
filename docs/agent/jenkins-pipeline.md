---
hide:
  - footer
---

# Добавление в Jenkins pipeline

Консольный агент поддерживает добавление в Jenkins Pipeline и поставляется как в виде docker-образа, так и в виде бинарного файла.

### Docker-образ Johnny

Пример для добавления в `pipeline` с использованием docker-образа Johnny:

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

### Бинарный файл Johnny

Для использования бинарного файла консольного агента, необходимо предварительно выполнить следующие действия на машине с Jenkins:

1. Скачать файл командой
  ```bash
  wget -O /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
  ```
  или
  ```bash
  curl -o /usr/local/bin/johnny https://REGISTRY_USERNAME:REGISTRY_PASSWORD@registry-one.codescoring.ru/repository/files/codescoring/johnny-depp/JOHNNY_VERSION/johnny-linux-amd64-JOHNNY_VERSION
  ```
  `JOHNNY_VERSION` необходимо заменить на версию агента. Список актуальных версий с описанием доступен [здесь](/changelog/#johnny). `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` необходимо заменить на логин и пароль, полученные от вендора.
2. Разрешить исполнение файла
  ```bash
  chmod +x /usr/local/bin/johnny
  ```

Пример вызова бинарного файла агента в `pipeline`:

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

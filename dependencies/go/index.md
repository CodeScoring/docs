- [English](https://docs.codescoring.ru/dependencies/go.en/index.md)

# Работа с зависимостями в Go

## Go Modules

### Создание файла `go.sum`

1. Инициализируйте модуль:

   ```
   go mod init <module_name>
   ```

1. Установите зависимости:

   ```
   go get <package>
   ```

1. После установки зависимостей автоматически создаются и обновляются файлы `go.mod` и `go.sum`.

1. Закрепите версии зависимостей:

   ```
   go mod tidy
   ```

---
hide:
  - footer
---
# Работа с зависимостями в Go

## Go Modules

### Создание файла `go.sum`

1. Инициализируйте модуль:
   ```sh
   go mod init <module_name>
   ```

2. Установите зависимости:
   ```sh
   go get <package>
   ```

3. После установки зависимостей автоматически создаются и обновляются файлы `go.mod` и `go.sum`.

4. Закрепите версии зависимостей:
   ```sh
   go mod tidy
   ```

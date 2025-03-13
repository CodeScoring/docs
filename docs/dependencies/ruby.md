---
hide:
  - footer
---
# Работа с зависимостями в Ruby

## Bundler 

### Создание файла `Gemfile.lock`

1. Инициализируйте проект:
   ```sh
   bundle init
   ```

2. Установите зависимости:
   ```sh
   bundle install
   ```
   или cоздайте lock-file напрямую:
   ```sh
   bundle lock
   ```
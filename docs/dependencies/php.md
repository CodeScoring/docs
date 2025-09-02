---
hide:
  - footer
---

# Работа с зависимостями в PHP

## Composer

### Создание файла `composer.lock`

1. Инициализируйте проект:
   ```sh
   composer init
   ```

2. Установите зависимости:
   ```sh
   composer install
   ```
   или создайте lock-file напрямую:
   ```sh
   composer update
   ```
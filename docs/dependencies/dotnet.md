---
hide:
  - footer
---
# Работа с зависимостями в .NET

## NuGet

### Создание файла `packages.lock.json`

1. Включите поддержку lock-файла (для .NET 5 и выше):
   ```sh
   dotnet nuget locals all --clear
   ```

2. Установите зависимости:
   ```sh
   dotnet restore --use-lock-file
   ```

### Создание файла `paket.lock`

1. Создайте lock-file:
   ```sh
   paket install
   ```
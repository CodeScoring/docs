---
hide:
  - footer
---

# Работа с зависимостями в Python

## pip

### Создание файла `requirements.txt`

1. Установите зависимости и сохраните их в lock-файл:
   ```sh
   pip freeze > requirements.txt
   ```

## pipenv

### Создание файла `Pipfile.lock`

1. Установите pipenv:
   ```sh
   pip install pipenv
   ```

2. Создайте `Pipfile.lock`:
   ```sh
   pipenv install
   ```

## poetry

### Создание файла `poetry.lock`

Если файл `poetry.lock` еще не существует, Poetry создаст его автоматически при установке зависимостей. Если файл уже существует, он будет обновлен. Для этого выполните команду:

   ```bash
   poetry lock
   ```

Эта команда обновит зависимости, указанные в `pyproject.toml`, и создаст или обновит файл `poetry.lock`.

## pipdeptree

### Создание файла `pipdeptree.txt`

При обнаружении файла `pipdeptree.txt` агент проанализирует его содержимое как результат вывода утилиты pipdeptree в стандартном формате дерева зависимостей. 
Для создания файла можно использовать следующие команды:

   ```bash
   pipdeptree > pipdeptree.txt
   ```
Для фильтрации вывода по конкретным пакетам окружения:
   ```bash
   pipdeptree --packages "example1,example2" > pipdeptree.txt
   ```

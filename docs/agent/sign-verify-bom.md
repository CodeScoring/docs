---
hide:
  - footer
---

# Подпись и верификация SBOM

Для подтверждения целостности и подлинности поддерживается подпись и верификация SBOM файлов с использованием цифровых подписей RSA SHA256.

## Команды

### sign bom - Подпись SBOM файла

Команда `sign bom` создает цифровую подпись для SBOM файла.

#### Параметры

- `--private-key <путь>` - путь к приватному ключу RSA в формате PEM (обязательный)
- `--include-public-key` - включить публичный ключ в SBOM файл (опциональный)

#### Примеры запуска

```bash
# Подпись файла с указанием приватного ключа
./johnny sign bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--private-key <private_key_pem>

# Подпись файла с включением публичного ключа в SBOM
./johnny sign bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--private-key <private_key_pem> \
--include-public-key 
```

### verify bom - Верификация подписи SBOM файла

Команда `verify bom` проверяет цифровую подпись SBOM файла.

#### Параметры

- `--public-key <путь>` - путь к публичному ключу RSA в формате PEM (опциональный)

#### Примеры использования

```bash
# Верификация с использованием публичного ключа из файла
./johnny verify bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--public-key <public_key_pem>

# Верификация с использованием ключа из SBOM файла
./johnny verify bom <bom_json> \
--api_token <api_token> \
--api_url <api_url>
```

## Exit коды

- `0` - успешная операция
- `4` - ошибка верификации подписи

## Требования

- Поддерживаются только RSA ключи
- Ключи должны быть в формате PEM

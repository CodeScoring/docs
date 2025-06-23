---
hide:
  - footer
---

# Интеграция OSS Index

В дополнение к внутренней базе данных **CodeScoring Index** для расширенного анализа можно также подключить сторонний фид [Sonatype OSS Index](https://ossindex.sonatype.org/).

Интеграция осуществляется в разделе `Настройки -> OSS Index`. Для подключения необходимо заполнить Email и API токен, полученный при регистрации пользователя в Sonatype OSS Index.

![OSS Index](/assets/img/oss-index.png)

**Важно**:

1. OSS Index используется только во время запуска SCA.
2. OSS Index будет ссылаться на сторонний URL-адрес: [https://ossindex.sonatype.org/](https://ossindex.sonatype.org/).
3. Скорость SCA может снизиться при использовании OSS Index.
4. При использовании OSS Index без токена система может возвращать данные, отличные от авторизованных запросов.
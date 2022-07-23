# Настройки LDAP

CodeScoring поддерживает авторизацию пользователей по протоколу LDAP.

Управление настройками происходит в разделе `Settings -> LDAP`.

Для корректной работы надо задать все обязательные параметры и обязательно активировать флаг **Is active**. Проверить правильность конфигурации можно, нажав кнопку **Test it**.

![CodeScoring ldap settings example](/assets/img/ldap-settings.png)

**Назначение полей**

- `LDAP protocol` - выбор между **LDAP** и **LDAPS** (**LDAP** поверх **SSL**)
- `LDAP hostname` - доменное имя или IP адрес сервера **LDAP** 
- `LDAP port` - порт **LDAP** сервера
- `Search base `- указание места поиска объектов **(Object class)**
- `Object class` - наименовние объекта хранящего пользовательскую запись
- `Username field` - атрибут хранящий логип пользователя в **(Object class)**
- `Email field` - атрибут хранящий email пользователя в **(Object class)**
- `First name field` - атрибут хранящий Имя пользователя в **(Object class)**
- `Last name field` - атрибут хранящий Фамилию пользователя в **(Object class)**
- `Username format` - выбор формата строки авторизации
  ![CodeScoring ldap settings Username format](/assets/img/ldap-username-format.png) 
- `Auth user` - логин пользователя с правами чтения каталогов на сервере **LDAP**
- `Auth password` - пароль пользователя с правами чтения каталогов на сервере **LDAP**
- `Use tls` - использовать **TLS**
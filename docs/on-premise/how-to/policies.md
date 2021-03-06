# Настройка политик

Система позволяет создать набор политик для генерации оповещений в соответствующем разделе. 

Управление политиками происходит в разделе `Settings -> Policies`. Перейти на форму создания категории можно по кнопке **Create new**.

**Важно!** В рамках пилотной установки политики срабатывают во время анализа, поэтому важно их создать до запуска анализа.

Результаты работы политик отображаются в разделе Policy alerts.

**Рекомендация!** Если оставить поля Proprietor и Project пустыми, политика будет применяться для всех активных проектов в системе.

В рамках тестирования рекомендуется завести политики на события:

- License compatibility issue — политика совместимости лицензий;
- License category found — нахождение критических для бизнеса категорий, таких как: Copyleft, Weak copyleft, Network Copyleft.

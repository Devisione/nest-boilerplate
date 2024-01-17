# Структура проекта

+ **libs** - самодостаточные библиотеки. Можно выносить переиспользуемые модули
+ **src** - основной код проекта
+ + common - общие элементы проекта, может содержать сущности nest (guards, filters, pipes, middlewares, interceptors), константы, утилиты и т.д
+ + examples - пример модуля 
+ + + [dist] decorators - кастомные декораторы
+ + + [dist] dto - промежуточные объекты для передачи между клиентом и bff
+ + + [dist] entity - сущности
+ + + examples.module.ts - корневой файл модуля
+ + + examples.controller.ts - контроллер, эндпоинты для общения с клиентом (может быть публичным и приватным)
+ + + examples.controller.spec.ts - тесты для контроллера
+ + + examples.public-service.ts - сервис, методы вызываемые эндпоинтами (может быть публичным и приватным)
+ + + examples.public-service.spec.ts - тесты для сервиса
+ + + examples.interfaces.ts - типы и интерфейсы
+ + + examples.constants.ts - константы

Подробнее про структуру nest и его сущности можно почитать [здесь](https://docs.nestjs.com/first-steps);
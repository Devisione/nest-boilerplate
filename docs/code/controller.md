# Контроллер

Контроллеры отвечают за обработку входящих запросов и возврат ответов клиенту.       
Класс необходимо обернуть в декоратор `@Controller` и указать путь до эндпоинтов внутри.     
Методы обязательно нужно оборачивають в декораторы [HTTP методов](https://docs.nestjs.com/controllers#resources).

#### **Важно!**
Методы в контроллере ничего не вычисляют, они могут только вызывать методы сервиса

## Аутентификация
Для создания защищенных эндпоинтов можно создать guard и обернуть класс в декоратор `@UseGuards`. Таким образом перед обработкой запроса вашим эндпоинтом он сначала пройдет обработку guard`ом, после чего попадет в нужный метод контроллера.

## Swagger
Класс обязательно нужно обернуть в декоратор `@ApiTags`, чтобы он появился в swagger. Если контроллер имеет аутентификацию, то нужно добавить необходимый декоратор, например, `@ApiCookieAuth`.
По умолчанию описаные методы с помощью декораторов `@nestjs/common` попадают в swagger, но для более подробного описания лучше использовать декораторы из `@nestjs/swagger`

### Пример
[examples.private-controller.ts](..%2F..%2Fsrc%2Fexamples%2Fexamples.private-controller.ts)

### Доп. информация
Описание controllers - [ссылка](https://docs.nestjs.com/controllers)
Guard - [ссылка](https://docs.nestjs.com/guards)
Authentication - [ссылка](https://docs.nestjs.com/security/authentication)
Swagger - [ссылка](https://docs.nestjs.com/openapi/operations) и [ссылка](https://docs.nestjs.com/openapi/security)
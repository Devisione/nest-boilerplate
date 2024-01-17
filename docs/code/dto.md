# DTO (Data Transfer Object)

Важная часть в общении клиент-сервера. В основном DTO используються в двух типах: input и output:
- **input dto** - приходящий с клиента
- **input dto** - возвращаемый на клиент

#### **Важно!**
Если общение происходит еще между **внешним API**, то перед отправкой данных пришедших из такого API должны быть трансформированы в **output dto**

## Описание типа
Описание типа осуществляеться в ООП стиле.  
## Валидация
Валидация dto осуществляеться с помощью библиотеки **[class-validator](https://github.com/typestack/class-validator)**.     
Ошибки по валидации возвращаються на клиент. Обработку таких ошибок можно найти в [common/pipes/validation-pipe.ts](..%2F..%2Fsrc%2Fcommon%2Fpipes%2Fvalidation-pipe.ts)
## Swagger
По умолчанию описаные свойства с помощью `class-validator` попадают в swagger, но для более подробного описания лучше использовать декораторы из `@nestjs/swagger`

### Пример
[create-example.dto.ts](..%2F..%2Fsrc%2Fexamples%2Fdto%2Fcreate-example.dto.ts)

### Доп. информация
Описание dto - [ссылка](https://docs.nestjs.com/controllers#request-payloads)      
Pipe - [ссылка](https://docs.nestjs.com/pipes)      
Валидация - [ссылка](https://docs.nestjs.com/techniques/validation)     
Swagger - [ссылка](https://docs.nestjs.com/openapi/types-and-parameters) и [ссылка](https://docs.nestjs.com/openapi/mapped-types)
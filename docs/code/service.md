# Сервис (Provider)
Provider`ы являются фундаментальной концепцией в Nest. Многие из базовых классов Nest могут рассматриваться как поставщики – сервисы, репозитории, фабрики, помощники и так далее. Основная идея провайдера заключается в том, что он может быть внедрен как зависимость.

## Экспорт
Для использования провайдера в другом модуле, необходимо добавить провайдер в экспорт модуля, затем импортировать нужный модуль в другой. После чего в конструктор другого провайдера добавить запись:

```typescript
class Provider {
  constructor(private readonly providerName: ImportedProvider) {}
}
```

## Выбрасывание ошибок
Все ошибки для возврата на клиент необходимо выбрасывать с помощью специальных [классов](https://docs.nestjs.com/exception-filters#built-in-http-exceptions).   
Чтобы выбросить на клиент кастомный код ошибки, необходимо:
1) добавить новый код в [error-codes.ts](..%2F..%2Fsrc%2Fcommon%2Fconstants%2Ferror-codes.ts)
2) добавить в вызов ошибки обект с полем `errorCode`, куда поместить созданную ошибку

```typescript
import { BadRequestException } from "@nestjs/common";
import { ErrorCodes } from "./error-codes";

new BadRequestException({message: 'Описание ошибки', errorCode: ErrorCodes.NewErrorCode });
```

Обработку всех ошибок можно найти в [common/filters/all-exception-filter.ts](..%2F..%2Fsrc%2Fcommon%2Ffilters%2Fall-exception-filter.ts)

### Пример
[examples.private-service.ts](..%2F..%2Fsrc%2Fexamples%2Fexamples.private-service.ts)

### Доп. информация
Описание providers - [ссылка](https://docs.nestjs.com/providers)
Ошибки - [ссылка](https://docs.nestjs.com/exception-filters)
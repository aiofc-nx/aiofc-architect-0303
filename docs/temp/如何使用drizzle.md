# 如何使用drizzle-orm

## 概述

使用drizzle-orm是为了更好地操作数据库。
:::
`drizzle-orm`使用与`nodejs`运行时，并没有和框架绑定。
:::

## 心智

`node-postgres`是操作`postgresql`数据库的驱动，其本身并没有和框架绑定。

`node-postgres`之下是`NodePgDatabase`,它是真正操作数据库的工具。

首先，我们构建一个`DrizzleService`类，并定义一个属性`db`，它的类型定义为`NodePgDatabase`，这样我们就可以通过调用
`DrizzleService.db`使用`NodePgDatabase`

不过我们不希望每次使用前都要实例化一次`DrizzleService`，所以，我们需要利用`nestjs`的注入机制。

```ts
@Injectable()
export class DrizzleService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    readonly db: NodePgDatabase<typeof schema>,
  ) {}
}
```

`@Inject(DrizzleAsyncProvider)`是一个`token`，指向一个提供者：

```ts
export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider: Provider = {
  provide: DrizzleAsyncProvider,
  inject: [PgClientService],
  useFactory: async ({ vectorStore }: PgClientService) => {
    const db = drizzle(vectorStore.client, { schema });
    return db;
  },
};
```

在这个提供者具体定义了

# @aiofc/config

## 概述

`Nestjs`提供了一个官方的`@nestjs/config`模块，用于应用的配置。

我们在此基础上进行了扩展，增加了以下功能：

* 使用`yaml`格式文件来设置环境变量
* 增加`zod`验证
* 实现了配置对象的类型安全
* 封装了模块引入函数，简化了使用者的配置过程

## 使用说明

### 安装

我们会把`@aiofc/config`作为一个依赖引入其他的项目，就像其他的第三方包一样，我们需要在`package.json`中安装。

```json
{
    "dependencies": {
    "@aiofc/config": "workspace:*",
    }
}
```

### 引入

我们需要通过`.env`文件了传递一个参数

```txt
CONFIG_FILE_PATH=./apps/pg-admin/src/assets/config.development.yaml
```

然后，在根模块全局引入。

```ts
import { setupConfigModule } from '@aiofc/config';
import { Module } from '@nestjs/common';

import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';

@Module({
  imports: [setupConfigModule()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 在代码中使用

# 数据建模

## 概述

在多租户SAAS平台的数据建模中，确保每张表具有共同的字段属性是非常重要的。这不仅有助于数据的管理和追踪，还能确保数据的隔离和一致性。以下是一些建议的共同字段属性：

### 1. 租户ID

* **字段名称**: `tenant_id`

* **类型**: 通常使用UUID或VARCHAR类型，以便唯一标识每个租户。
* **用途**: 用于区分不同租户的数据，确保数据隔离。

### 2. 数据追踪字段

为了追踪数据的创建和修改，建议在每张表中添加以下字段：

* **创建时间**:
  * **字段名称**: `created_at`
  * **类型**: `TIMESTAMP` 或 `DATETIME`
  * **用途**: 记录数据的创建时间。

* **创建者ID**:
  * **字段名称**: `created_by`
  * **类型**: `VARCHAR` 或 `UUID`
  * **用途**: 记录创建该条数据的用户ID。

* **更新时间**:
  * **字段名称**: `updated_at`
  * **类型**: `TIMESTAMP` 或 `DATETIME`
  * **用途**: 记录数据的最后更新时间。

* **更新者ID**:
  * **字段名称**: `updated_by`
  * **类型**: `VARCHAR` 或 `UUID`
  * **用途**: 记录最后更新该条数据的用户ID。

### 3. 示例表结构

以下是一个示例表结构，展示如何在表中实现这些共同字段属性：

```typescript
import { relations } from 'drizzle-orm';
import { text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const exampleTable = createTrackedTable('example', {
  tenant_id: varchar('tenant_id', { length: 36 }).notNull(), // 租户ID
  created_at: timestamp('created_at').notNull().defaultNow(), // 创建时间
  created_by: varchar('created_by', { length: 36 }), // 创建者ID
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(), // 更新时间
  updated_by: varchar('updated_by', { length: 36 }), // 更新者ID
  // 其他业务相关字段...
});
```

### 4. 其他考虑

* **索引**: 在`tenant_id`字段上创建索引，以提高查询性能。

* **默认值**: 对于时间戳字段，可以设置默认值为当前时间，以便自动记录创建和更新时间。
* **外键约束**: 如果有用户表，`created_by`和`updated_by`字段可以设置为外键，确保数据的完整性。

通过在每张表中添加这些共同字段属性，您可以更好地管理和追踪数据，同时确保多租户环境下的数据隔离。如果您有其他具体问题或需要进一步的帮助，请随时告诉我！

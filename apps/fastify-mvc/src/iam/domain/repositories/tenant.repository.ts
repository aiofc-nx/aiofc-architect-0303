import { Injectable } from '@nestjs/common';

import { tenantTable } from '../../../drizzle/schemas/index';
import { TenantDTO } from '../dtos/tenant.dto';
import { ITenantRepository } from '../interfaces/tenant.interface';

@Injectable()
export class TenantRepository implements ITenantRepository {
  constructor(private readonly) {}

  async create(tenant: TenantDTO): Promise<TenantDTO> {
    const db = this.databaseOptions.getDb();
    const createdTenant = await db
      .insert(tenantTable)
      .values(tenant)
      .returning(); // 使用 ORM 创建租户
    return createdTenant[0]; // 返回创建的租户
  }

  async update(tenant: TenantDTO): Promise<TenantDTO> {
    const db = this.databaseOptions.getDb();
    await db
      .update(tenantTable)
      .set(tenant)
      .where(tenantTable.id.equals(tenant.id)); // 使用 ORM 更新租户
    return tenant; // 返回更新后的租户
  }

  async delete(id: string): Promise<void> {
    const db = this.databaseOptions.getDb();
    await db.delete(tenantTable).where(tenantTable.id.equals(id)); // 使用 ORM 删除租户
  }

  async findById(id: string): Promise<TenantDTO | null> {
    const db = this.databaseOptions.getDb();
    const tenant = await db
      .select()
      .from(tenantTable)
      .where(tenantTable.id.equals(id))
      .execute(); // 使用 ORM 查找租户
    return tenant.length > 0 ? tenant[0] : null; // 返回找到的租户或 null
  }

  async findAll(): Promise<TenantDTO[]> {
    const db = this.databaseOptions.getDb();
    const tenants = await db.select().from(tenantTable).execute(); // 使用 ORM 查找所有租户
    return tenants; // 返回租户列表
  }
}

import { TenantDTO } from '../dtos/tenant.dto';

export interface ITenantRepository {
  create(tenant: TenantDTO): Promise<TenantDTO>;
  update(tenant: TenantDTO): Promise<TenantDTO>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<TenantDTO | null>;
  findAll(): Promise<TenantDTO[]>;
}

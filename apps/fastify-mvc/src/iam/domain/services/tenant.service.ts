import { TenantDTO } from '../dtos/tenant.dto';
import { ITenantRepository } from '../interfaces/tenant.interface';

export class TenantService {
  constructor(private tenantRepository: ITenantRepository) {}

  async createTenant(tenantDTO: TenantDTO): Promise<TenantDTO> {
    // 业务逻辑
    return this.tenantRepository.create(tenantDTO);
  }
}

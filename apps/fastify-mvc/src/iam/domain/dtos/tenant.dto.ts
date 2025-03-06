export class TenantDTO {
  id: string;
  tenantId: string;
  name: string;
  database: string;
  schema: string;
  description?: string;
  status: string;
  organizationCode: string;
  organizationName?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

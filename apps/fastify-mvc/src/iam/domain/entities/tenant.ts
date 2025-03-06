export class Tenant {
  /**
   * 租户ID
   */
  id: string;
  /**
   * 租户标识
   */
  tenantId: string;
  /**
   * 租户名称
   */
  name: string;
  /**
   * 租户数据库标识
   */
  database: string;
  /**
   * 租户Schema
   */
  schema: string;
  /**
   * 租户描述
   * 可选字段
   */
  description?: string;
  /**
   * 租户状态
   */
  status: string;
  /**
   * 组织机构代码
   */
  organizationCode: string;
  /**
   * 组织名称
   * 可选字段
   */
  organizationName?: string;
  /**
   * 租户分类
   */
  category: string;
  /**
   * 创建时间
   */
  createdAt: Date;
  /**
   * 更新时间
   */
  updatedAt: Date;
  /**
   * 删除时间（软删除）
   * 可选字段
   */
  deletedAt?: Date;

  constructor(
    id: string,
    tenantId: string,
    name: string,
    database: string,
    schema: string,
    status: string,
    organizationCode: string,
    category: string,
    createdAt: Date,
    updatedAt: Date,
    description?: string,
    organizationName?: string,
    deletedAt?: Date,
  ) {
    this.id = id;
    this.tenantId = tenantId;
    this.name = name;
    this.database = database;
    this.schema = schema;
    this.status = status;
    this.organizationCode = organizationCode;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
    this.organizationName = organizationName;
    this.deletedAt = deletedAt;
  }
}

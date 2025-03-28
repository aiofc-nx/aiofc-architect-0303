export enum TenantStatus {
  ACTIVE = 'active', // 正常
  INACTIVE = 'inactive', // 禁用
  SUSPENDED = 'suspended', // 暂停
  EXPIRED = 'expired', // 过期
  // 可以考虑添加更多状态
}

export enum TenantCategory {
  ENTERPRISE = 'enterprise', // 企业
  GOVERNMENT = 'government', // 政府
  EDUCATION = 'education', // 教育
  PERSONAL = 'personal', // 个人
  OTHER = 'other', // 其他
  // 可以考虑添加更多分类
}

import {
  ConfigService,
  getDatabaseConfig,
  IDatabaseConfig,
} from '@aiofc/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfig {
  private config: IDatabaseConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = getDatabaseConfig(this.configService);
  }

  // get schemaName(): string {
  //   return this.config.schemaName;
  // }

  // Same as postgresqlConnection but allows to be used outside of NestJS context
  get postgresqlConnection(): string {
    return `postgres://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.dbName}`;
  }

  // static getSchemaName(config: IDatabaseConfig): string {
  //   return config.schemaName;
  // }
}

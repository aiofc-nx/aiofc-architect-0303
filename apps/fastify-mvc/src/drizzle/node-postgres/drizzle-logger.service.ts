import { PinoLogger } from '@aiofc/logger';
import { Injectable } from '@nestjs/common';
import { Logger } from 'drizzle-orm/logger';

/**
 * Custom Drizzle logger that logs the interpolated queries. This is quite useful to have the query ready to copy-paste into Datagrip/DBeaver/etc
 */
@Injectable()
export class DrizzleLoggerService implements Logger {
  private readonly logger = new PinoLogger({
    renameContext: 'drizzle',
  });

  logQuery(query: string, params: unknown[]): void;
  logQuery(query: string, params: unknown[]): void;
  logQuery(query: string, params: unknown[]): void {
    const interpolatedQuery = this.interpolateQuery(query, params);
    this.logger.info(interpolatedQuery);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private interpolateQuery(query: string, parameters?: any[]) {
    if (parameters && parameters.length) {
      parameters.forEach((parameter, index) => {
        query = query.replace(
          new RegExp(`\\$${index + 1}`),
          `'${typeof parameter === 'object' ? JSON.stringify(parameter) : parameter}'`,
        );
      });
    }
    return query;
  }
}

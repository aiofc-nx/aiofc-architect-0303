// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { PgTableWithColumns } from 'drizzle-orm/pg-core';
// import {
//   booksTable,
//   jobsTable,
//   tenantsTable,
//   usersTable,
// } from '../database/schemas';

// const schema = {
//   ...jobsTable,
//   ...tenantsTable,
//   ...usersTable,
//   ...booksTable,
// };

// // type TableName = keyof typeof schema;
// // const tableNames = Object.keys(schema) as TableName[];
// // console.log(tableNames);

// // export type ApiPgDatabase = typeof pgDatabase;
// // export type ApiPgTables = typeof schema;

// type TableName<T extends PgTableWithColumns<any>> =
//   T extends PgTableWithColumns<infer TableConfig> ? TableConfig['name'] : never;
// type TableNameInSchema<T extends PgTableWithColumns<any>> = {
//   [K in keyof TablesOnly<ApiPgTables> as TableName<ApiPgTables[K]>]: K;
// }[TableName<T>];

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-d6rombpj16oc73earrt0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'node_demo_vkg6_user',
  password: 'kB6kTqvq1qZMlV5VWWbkK5sP5ayIMeIf',
  database: 'node_demo_vkg6',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});

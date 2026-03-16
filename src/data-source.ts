import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'kmphitech',
  database: 'vibeQuest',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});

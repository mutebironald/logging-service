import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User } from '../entities/user.entity';
import { Log } from '../entities/log.entity';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT) || 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  synchronize: true, // Set to false in production
  logging: false,
  entities: [User, Log],
});

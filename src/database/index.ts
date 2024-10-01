import { Client } from 'pg';
import 'dotenv/config';

const { DB_USER, DB_HOST, DB_PASSWORD, DB_PORT, DB_DATABASE } = process.env;

const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    return client.query(`CREATE DATABASE ${ DB_DATABASE }`);
  })
  .then(() => {
    console.log('Database created successfully');
  })
  .catch((err) => {
    if (err.code === '42P04') {
      console.log('Database already exists.');
    } else {
      console.error('Error creating database:', err);
    }
  })
  .finally(() => {
    client.end();
  });

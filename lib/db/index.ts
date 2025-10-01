import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const db = drizzle(databaseUrl);

export default db;

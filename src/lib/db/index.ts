import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { attachDatabasePool } from '@vercel/functions';
import * as schema from './schema';
let pool:Pool | undefined;
export function getDb() {
 if(!process.env.DATABASE_URL) throw new Error('Configure DATABASE_URL to connect Neon.');
 if(!pool) { pool=new Pool({connectionString:process.env.DATABASE_URL,max:5,idleTimeoutMillis:5000,connectionTimeoutMillis:10000}); attachDatabasePool(pool); }
 return drizzle(pool,{schema});
}

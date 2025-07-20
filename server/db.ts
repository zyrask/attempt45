import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';
import * as schema from '@shared/schema';

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL not set. Database features will be disabled.');
}

export const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = pool ? drizzle({ client: pool, schema }) : null;

// Test connection once on startup (optional but recommended)
if (pool) {
  pool
    .query('SELECT NOW()')
    .then((result) => {
      console.log('✅ DB connected, current time:', result.rows[0].now);
    })
    .catch((error) => {
      console.error('❌ DB connection failed:', error);
    });
}

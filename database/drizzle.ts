// import { neon } from '@neondatabase/serverless';

// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle({ client: sql });
// export default db;

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });


// import { drizzle } from 'drizzle-orm/neon-http';
// import { Client } from '@neondatabase/serverless'; 
// const sql = new Client(process.env.DATABASE_URL!); 
// const db = drizzle({ client: sql }); 
// export default db;
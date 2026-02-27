//connection pool
import 'dotenv/config';
import express from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL!,
    ssl: true
  }
});

const PORT = process.env.PORT;
const app = express();

app.listen(PORT ,() => {
    console.log("server is running");
})




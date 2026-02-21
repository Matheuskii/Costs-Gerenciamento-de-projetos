import mysql from 'mysql2/promise';
import 'dotenv/config'; 

export const db = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 27441, 
    
    ssl: {
        rejectUnauthorized: false 
    },
    decimalNumbers: true 
});

console.log("Conectado ao banco de dados ebaaaaa!!!!");

export default db;

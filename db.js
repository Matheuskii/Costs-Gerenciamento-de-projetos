
import mysql from 'mysql2/promise'

const user = "root"
const password = "senai"
const database = "costs"
const host = "localhost"

export const db = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    port: 3306
});

console.log("Conectado ao banco de dados ebaaaaa!!!!");

export default db
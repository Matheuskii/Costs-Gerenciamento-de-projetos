import { db } from './db.js'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(bodyParser.json())

app.get('/categories', async (req, res) =>{
    try {
        const [rows] = await db.execute('SELECT * FROM categories')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ erro: err.message})
    }
})


app.listen(5000, ()=>{
    console.log("Servidor rodando na porta 5000")
})
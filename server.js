import { db } from './db.js'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.json())

app.get('/categories', async (req, res) => {
    try{
    const [rows] = await db.execute('SELECT * FROM categories')
    res.json(rows)
    } catch (error){
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ error: 'Erro ao buscar categorias' });
    }

})

app.get('/projects', async (req, res) => {
    try {
    const [rows] = await db.execute('SELECT * FROM projects')
    res.json(rows)
    } catch (error){
        console.error('Erro ao buscar projetos:', error);
        res.status(500).json({ error: 'Erro ao buscar projetos' });
    }
})

app.get('/projects/:id', async (req, res) => {
    try{
    const [rows] = await db.execute('SELECT * FROM projects WHERE id = ?', [req.params.id])
    if (rows.length === 0) {
        return res.status(404).json({ erro: 'Projeto não encontrado' })
    }
    res.json(rows[0])
} catch (error){
        console.error('Erro ao buscar projeto:', error);
        res.status(500).json({ error: 'Erro ao buscar projeto' });
    }
})

app.post('/projects', async (req, res) => {
    try{
    const { project_name, budget, category } = req.body
    const [result] = await db.execute(
        'INSERT INTO projects (project_name, budget, category_id) VALUES (?, ?, ?)',
        [project_name, budget, category.id]
    )
    res.json({ id: result.insertId, project_name, budget, category_id: category.id })
} catch (error){
        console.error('Erro ao criar projeto:', error);
        res.status(500).json({ error: 'Erro ao criar projeto' });
    }
})

app.put('/projects/:id', async (req, res) => {
    try{
    const { project_name, budget, category_id } = req.body
    const [result] = await db.execute(
        'UPDATE projects SET project_name = ?, budget = ?, category_id = ? WHERE id = ?',
        [project_name, budget, category_id, req.params.id]
    )
    if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Projeto não encontrado' })
    }
    res.json({ id: req.params.id, project_name, budget, category_id })
} catch (error){
        console.error('Erro ao atualizar projeto:', error);
        res.status(500).json({ error: 'Erro ao atualizar projeto' });
    }
})

app.delete('/projects/:id', async (req, res) => {
    try{
    await db.execute('DELETE FROM projects WHERE id = ?', [req.params.id])
    res.json({ ok: true })
    } catch (error){
        console.error('Erro ao deletar projeto:', error);
        res.status(500).json({ error: 'Erro ao deletar projeto' });
    }
})

app.listen(5000, () => console.log('Servidor porta 5000'))

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config(); 


const tenisRoutes = require('./routes/tenisRoutes');
const vendaRoutes = require('./routes/vendaRoutes'); 
const pagamentoPrazoRoutes = require("./routes/pagamentoPrazoRoutes");
const dashboardRoutes = require('./routes/dashboardRoutes'); 
const app = express();
const port = 3000;


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});


pool.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados', err));


app.use(cors());
app.use(bodyParser.json()); 


app.post('/api/tenis', async (req, res) => {
  const { numeracao, marca, modelo, precoCusto, precoVenda, quantidade } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tenis (numeracao, marca, modelo, preco_custo, preco_venda, quantidade) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [numeracao, marca, modelo, precoCusto, precoVenda, quantidade]
    );
    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error('Erro ao cadastrar tênis', err);
    res.status(500).json({ error: 'Erro ao cadastrar tênis' });
  }
});


app.get('/api/tenis', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tenis');
    res.status(200).json(result.rows); 
  } catch (err) {
    console.error('Erro ao listar tênis', err);
    res.status(500).json({ error: 'Erro ao listar tênis' });
  }
});


app.delete('/api/tenis/:id', async (req, res) => {
  const { id } = req.params; 
  try {
    const result = await pool.query('DELETE FROM tenis WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tênis não encontrado' });
    }
    res.status(200).json({ message: 'Tênis excluído com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir tênis', err);
    res.status(500).json({ error: 'Erro ao excluir tênis' });
  }
});




// AQUI TO USANDO A ROTA DE VENDAS
app.use('/vendas', vendaRoutes);
app.use('/api/tenis', tenisRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use("/api", pagamentoPrazoRoutes);
 

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
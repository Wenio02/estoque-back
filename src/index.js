const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env

// Importando as rotas
const tenisRoutes = require('./routes/tenisRoutes');
const vendaRoutes = require('./routes/vendaRoutes'); // Corrigido para o nome correto do arquivo

const app = express();
const port = 3000;

// Conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Teste de conexão com o banco de dados
pool.connect()
  .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
  .catch((err) => console.error('Erro ao conectar ao banco de dados', err));

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Para parsear o corpo das requisições como JSON

// Rota para cadastrar um tênis
app.post('/api/tenis', async (req, res) => {
  const { numeracao, marca, modelo, precoCusto, precoVenda, quantidade } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tenis (numeracao, marca, modelo, preco_custo, preco_venda, quantidade) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [numeracao, marca, modelo, precoCusto, precoVenda, quantidade]
    );
    res.status(201).json(result.rows[0]); // Retorna o tênis cadastrado
  } catch (err) {
    console.error('Erro ao cadastrar tênis', err);
    res.status(500).json({ error: 'Erro ao cadastrar tênis' });
  }
});

// Rota para listar todos os tênis
app.get('/api/tenis', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tenis');
    res.status(200).json(result.rows); // Retorna todos os tênis
  } catch (err) {
    console.error('Erro ao listar tênis', err);
    res.status(500).json({ error: 'Erro ao listar tênis' });
  }
});

// Rota para excluir um tênis
app.delete('/api/tenis/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID do tênis da URL
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

// Usando as rotas de vendas
app.use('/vendas', vendaRoutes);
app.use('/api/tenis', tenisRoutes);
app.use('/dashboard', require('./routes/dashboardRoutes'));
  // Certifique-se de que está utilizando a rota corretamente

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const vendaController = require('../controllers/vendaController')


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});


router.post('/', async (req, res) => {
  const { total, data, tipoPagamento, tenisId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO vendas (total, data, tipo_pagamento, tenis_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [total, data, tipoPagamento, tenisId]
    );
    res.status(201).json(result.rows[0]); 
  } catch (err) {
    console.error('Erro ao registrar venda', err);
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vendas');
    res.status(200).json(result.rows); 
  } catch (err) {
    console.error('Erro ao listar vendas', err);
    res.status(500).json({ error: 'Erro ao listar vendas' });
  }
});

router.get('/quantidade-produtos', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) AS total_produtos FROM tenis');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao contar produtos', err);
    res.status(500).json({ error: 'Erro ao contar produtos' });
  }
});

// Rota para excluir uma venda por ID Mateus
router.delete('/:id', vendaController.deleteVenda);

module.exports = router;

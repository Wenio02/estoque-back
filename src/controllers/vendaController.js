const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Função para excluir uma venda por ID
const deleteVenda = async (req, res) => {
  const { id } = req.params;  
  
  try {
    const result = await pool.query('DELETE FROM vendas WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }
    res.status(200).json({ message: 'Venda excluída com sucesso' });
  } catch (err) {
    console.error('Erro ao excluir venda', err);
    res.status(500).json({ error: 'Erro ao excluir venda' });
  }
};

module.exports = { deleteVenda };

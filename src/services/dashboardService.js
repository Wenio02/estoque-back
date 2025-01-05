const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Função para buscar os dados do dashboard no banco de dados
const getDashboardDataFromDb = async () => {
  try {
    // Consulta os dados da tabela dashboard_data
    const result = await pool.query('SELECT * FROM dashboard_data');
    return result.rows;
  } catch (err) {
    console.error('Erro ao buscar dados do dashboard', err);
    throw new Error('Erro ao buscar dados do dashboard');
  }
};

module.exports = {
  getDashboardDataFromDb,
};

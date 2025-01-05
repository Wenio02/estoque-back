const dashboardService = require('../services/dashboardService');

// Função para buscar dados do dashboard
const getDashboardData = async (req, res) => {
  try {
    const data = await dashboardService.getDashboardDataFromDb();
    res.status(200).json(data); // Retorna os dados para o frontend
  } catch (err) {
    console.error('Erro ao buscar dados do dashboard', err);
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
};

module.exports = {
  getDashboardData,
};

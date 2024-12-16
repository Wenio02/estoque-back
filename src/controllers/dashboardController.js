// src/controllers/dashboardController.js

const getDashboardData = (req, res) => {
    // Aqui você pode obter dados do banco de dados ou enviar dados estáticos para teste
    const dashboardData = {
      estoque: 100,  // Exemplo de dados
      vendasRealizadas: 50,  // Exemplo de dados
      pagamentosPendentes: 10,  // Exemplo de dados
    };
  
    res.json(dashboardData);  // Retorna os dados como resposta
  };
  
  module.exports = {
    getDashboardData,
  };
  
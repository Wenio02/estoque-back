const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');

// Rota para obter os dados do dashboard
router.get('/', getDashboardData); // Alterado para '/'

module.exports = router;
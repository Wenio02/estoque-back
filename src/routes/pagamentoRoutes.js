const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.post('/pagamento', pagamentoController.createPagamento);
// Outras rotas para editar pagamentos

module.exports = router;

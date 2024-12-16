const express = require('express');
const router = express.Router();
const tenisController = require('../controllers/tenisController');

// Definir as rotas para Tênis
router.post('/', tenisController.createTenis); // Criar novo tênis
router.delete('/:id', tenisController.deleteTenis); // Deletar tênis
router.get('/:id', tenisController.getTenisById); 
router.post('/:id/venda', tenisController.saleTenis);// Buscar tênis por ID

module.exports = router;

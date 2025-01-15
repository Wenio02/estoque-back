const express = require("express");
const PagamentoPrazoController = require("../controllers/pagamentoprazocontroller");

const router = express.Router();

router.post("/pagamentos-prazo", PagamentoPrazoController.registrarPagamento);
router.get("/pagamentos-prazo", PagamentoPrazoController.buscarPagamentos);

module.exports = router;
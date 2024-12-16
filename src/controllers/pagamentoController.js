
const pagamentoService = require('../services/pagamentoService');

exports.createPagamento = async (req, res) => {
  try {
    const pagamento = await pagamentoService.createPagamento(req.body);
    res.status(201).json(pagamento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

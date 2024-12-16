const vendaService = require('../services/vendaService');

exports.createVenda = async (req, res) => {
  try {
    const venda = await vendaService.createVenda(req.body);
    res.status(201).json(venda); // Retorna a venda criada
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar a venda: ' + err.message });
  }
};

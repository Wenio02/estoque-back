const Pagamento = require('../models/pagamento');

exports.createPagamento = async (data) => {
  return await Pagamento.create(data);
};

// Outros métodos para editar o status do pagamento podem ser adicionados aqui

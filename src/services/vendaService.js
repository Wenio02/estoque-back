const Venda = require('../models/venda');
const Tenis = require('../models/tenis');

exports.createVenda = async (data) => {
  try {
    // Criação da venda no banco de dados
    const venda = await Venda.create(data);

    // Atualiza o estoque de tênis decrementando a quantidade vendida
    await Tenis.decrement('quantidade', {
      by: data.quantidade,
      where: { id: data.tenisId }
    });

    return venda;
  } catch (error) {
    throw new Error('Erro ao criar a venda: ' + error.message);
  }
};

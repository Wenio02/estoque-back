const database = require('../config/database')

exports.createVenda = async (data) => {
  try {
    console.log("Dados recebidos para a venda:", data);

   
    if (!data.quantidade || !data.tenisId) {
      throw new Error("Campos obrigatórios (quantidade e tenisId) estão faltando.");
    }

    if (typeof data.quantidade !== 'number' || data.quantidade <= 0) {
      throw new Error("Quantidade deve ser um número maior que 0.");
    }

  
    const tenis = await Tenis.findByPk(data.tenisId);
    if (!tenis) {
      throw new Error(`Tênis com ID ${data.tenisId} não encontrado.`);
    }

   
    if (tenis.quantidade < data.quantidade) {
      throw new Error(
        `Estoque insuficiente. Estoque atual: ${tenis.quantidade}, Tentativa de venda: ${data.quantidade}`
      );
    }

    console.log("Dados do tênis antes da venda:", tenis);

   
    const venda = await Venda.create(data);
    console.log("Venda criada com sucesso:", venda);

    // Atualiza o estoque
    await Tenis.decrement('quantidade', {
      by: data.quantidade,
      where: { id: data.tenisId }
    });

    console.log(`Estoque atualizado para o tênis ID ${data.tenisId}`);

    return venda;

  } catch (error) {
    console.error("Erro ao criar a venda:", error.message);
    throw new Error('Erro ao criar a venda: ' + error.message);
  }
};

// excluir venda banco de dados mateusinho
const deleteVendaById = async (id) => {
  try {
    const query = 'DELETE FROM vendas WHERE id = $1';
    await databaseError.query(query, [id]);
  } catch (error) {
    throw new Error('Error ao excluir a venda do banco de dados');
  }
};
module.exports = {
  deleteVendaById
};
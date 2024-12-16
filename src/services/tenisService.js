
const { data } = require("react-router-dom");
const database = require("../config/database")

exports.createTenis = async (data) => {
  return await Tenis.create(data);
};

exports.getTenisById = async (id) => {
  const result = await database.query("select * from tenis where id = $1", [id])
  const tenis = result.rows[0]
  return {
    id: tenis.id,
    numeracao: tenis.numeracao,
    marca: tenis.marca,
    modelo: tenis.modelo,
    precoCusto: tenis.preco_custo,
    precoVenda: tenis.preco_venda,
    quantidade: tenis.quantidade,

  }
}


exports.deleteTenis = async (id) => {
  try {
    const tenis = await Tenis.findByPk(id); // Encontrar o tênis pelo ID
    if (tenis) {
      await tenis.destroy(); // Excluir o tênis encontrado
      return tenis; // Retorna o tênis excluído, se encontrado
    }
    return null; // Caso o tênis não exista
  } catch (err) {
    throw new Error("Erro ao excluir o tênis: " + err.message);
  }
};



exports.saleTenis = async (identificadorTenis, quantidadeVenda) => {
  try {


    const quantidadeAtual = await database.query("select quantidade from tenis where id = $1", [identificadorTenis])
    const quantidadeFinal = quantidadeAtual.rows[0].quantidade - quantidadeVenda
    await database.query(`INSERT INTO public.vendas
      (id, total, "data", tipo_pagamento, tenis_id)
      VALUES(nextval('vendas_id_seq'::regclass), $1, CURRENT_TIMESTAMP, $2, $3);`, [quantidadeFinal,"dinheiro",identificadorTenis])
    await database.query("update tenis set quantidade = $2 where id = $1", [identificadorTenis, quantidadeFinal]); // Encontrar o tênis pelo ID
    return quantidadeFinal
  } catch (err) {
    throw new Error("Erro ao excluir o tênis: " + err.message);
  }
};




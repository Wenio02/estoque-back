const { data } = require("react-router-dom");
const database = require("../config/database");

exports.createTenis = async (data) => {
  return await Tenis.create(data);
};

exports.getTenisById = async (id) => {
  const result = await database.query("SELECT * FROM tenis WHERE id = $1", [id]);
  const tenis = result.rows[0];

  if (!tenis) {
    throw new Error('Tênis não encontrado');
  }

  return {
    id: tenis.id,
    numeracao: tenis.numeracao,
    marca: tenis.marca,
    modelo: tenis.modelo,
    precoCusto: tenis.preco_custo,
    precoVenda: tenis.preco_venda,
    quantidade: tenis.quantidade,
  };
};

exports.deleteTenis = async (id) => {
  try {
    const result = await database.query("SELECT * FROM tenis WHERE id = $1", [id]);
    const tenis = result.rows[0];

    if (tenis) {
      await database.query("DELETE FROM tenis WHERE id = $1", [id]);
      return tenis;  // Retorna o tênis excluído
    }
    return null;  // Caso o tênis não exista
  } catch (err) {
    throw new Error("Erro ao excluir o tênis: " + err.message);
  }
};

exports.saleTenis = async (identificadorTenis, quantidadeVenda) => {
  try {
    const quantidadeAtualResult = await database.query("SELECT quantidade, preco_venda FROM tenis WHERE id = $1", [identificadorTenis]);

    if (!quantidadeAtualResult.rows[0]) {
      throw new Error('Tênis não encontrado');
    }

    const quantidadeAtual = quantidadeAtualResult.rows[0].quantidade;
    const precoVenda = quantidadeAtualResult.rows[0].preco_venda;

    if (quantidadeVenda > quantidadeAtual) {
      throw new Error('Quantidade em estoque insuficiente');
    }

    const quantidadeFinal = quantidadeAtual - quantidadeVenda;
    const totalVenda = precoVenda * quantidadeVenda;  // Calculando o total da venda

    // Inserindo a venda
    await database.query(
      `INSERT INTO public.vendas (total, "data", tipo_pagamento, tenis_id)
      VALUES ($1, CURRENT_TIMESTAMP, $2, $3);`, 
      [totalVenda, "dinheiro", identificadorTenis]
    );

    // Atualizando o estoque
    await database.query("UPDATE tenis SET quantidade = $1 WHERE id = $2", [quantidadeFinal, identificadorTenis]);

    return quantidadeFinal;  // Retorna a nova quantidade do tênis
  } catch (err) {
    throw new Error("Erro ao registrar a venda: " + err.message);
  }
};

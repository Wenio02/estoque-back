const db = require("../config/database");

class PagamentoPrazoService {
  static async registrarPagamento(pagamentoData) {
    const { produto_id, cliente, quantidade, valor_total, status_pagamento, data_pagamento } = pagamentoData;

    const query = `
      INSERT INTO pagamentos (produto_id, cliente, quantidade, valor, status_pagamento, data_pagamento)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [produto_id, cliente, quantidade, valor_total, status_pagamento, data_pagamento];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async buscarPagamentos() {
    const query = "SELECT * FROM pagamentos;";
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = PagamentoPrazoService;

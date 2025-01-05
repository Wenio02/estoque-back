const { format } = require("date-fns");
const PagamentoPrazoService = require("../services/pagamentoprazoservice");

class PagamentoPrazoController {
  static async registrarPagamento(req, res) {
    try {
      const { produto_id, cliente, quantidade, valor_total, status_pagamento, data_pagamento } = req.body;

      if (!produto_id || !cliente || !quantidade || !valor_total || !status_pagamento || !data_pagamento) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }

      const pagamento = await PagamentoPrazoService.registrarPagamento({
        produto_id,
        cliente,
        quantidade,
        valor_total,
        status_pagamento,
        data_pagamento,
      });

      res.status(201).json({ message: "Pagamento registrado com sucesso!", pagamento });
    } catch (error) {
      res.status(500).json({ message: "Erro ao registrar pagamento.", error: error.message });
    }
  }

  static async buscarPagamentos(req, res) {
    try {
      const pagamentos = await PagamentoPrazoService.buscarPagamentos();

      // Formatar a data_pagamento de cada pagamento
      const pagamentosFormatados = pagamentos.map((pagamento) => ({
        ...pagamento,
        data_pagamento: format(new Date(pagamento.data_pagamento), "dd/MM/yyyy HH:mm"),
      }));

      res.status(200).json(pagamentosFormatados);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar pagamentos.", error: error.message });
    }
  }
}

module.exports = PagamentoPrazoController;

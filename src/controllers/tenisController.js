
const tenisService = require('../services/tenisService');

// Criar novo tênis
exports.createTenis = async (req, res) => {
  try {
    const tenis = await tenisService.createTenis(req.body);
    res.status(201).json(tenis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um tênis
exports.deleteTenis = async (req, res) => {
  try {
    const { id } = req.params; // Obtenha o id do tênis a partir da URL
    const tenis = await tenisService.deleteTenis(id); // Chame o serviço para excluir o tênis
    if (tenis) {
      res.status(200).json({ message: "Tênis excluído com sucesso!" });
    } else {
      res.status(404).json({ message: "Tênis não encontrado!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Buscar tênis pelo ID (para exibir detalhes)
exports.getTenisById = async (req, res) => {
  try {
    const { id } = req.params; // Obtenha o id do tênis a partir da URL
    console.log("controler",id)
    const tenis = await tenisService.getTenisById(id); // Chama o serviço para buscar o tênis
    if (!tenis) {
      return res.status(404).json({ message: "Tênis não encontrado!" });
    }
    res.status(200).json(tenis); 
  } catch (err) { 
    console.error(err)
    res.status(500).json({ error: err.message });
  }
};


exports.saleTenis = async (req, res) => {
  try {
    const { id } = req.params; 
    const { quantidade } = req.body; 
    const quantidadeFinal = await tenisService.saleTenis(id,quantidade); 

    res.status(200).json({quantidade:quantidadeFinal})
  } catch (err) { 
    console.error(err)
    res.status(500).json({ error: err.message });
  }
};

const Planeta = require('../models/planeta-model');
const service = require('../services/planeta-service');

exports.create = async (req, res) => {  
  
  const nome = req.body.nome;
  
  if(!nome) {
    return res.status(206).send({message: "O Nome é obrigatório"});
  }

  try {
    const aparicoesEmFilmes = await service.getAparicoesEmFilmes(nome);  

    const planeta = new Planeta({
      nome,
      aparicoesEmFilmes,
      clima: req.body.clima,
      terreno: req.body.terreno
    });

    const data = await planeta.save();  
    
    res.send(data);

  } catch (error) {
    res.status(500).send({message: err.message || "Erro ao criar um planeta"});
  }
};

exports.findAll = (req, res) => {
  const nome = req.query.search;
  const query = nome ? {nome} : {};
  Planeta.find(query).then(planetas => {
    res.send(planetas);
  }).catch(err => {
    res.status(500).send({message: err.message || "Erro ao buscar todos os planetas"});
  });
};

exports.findOne = (req, res) => {
  Planeta.findById(req.params.id).then(planeta => {
    if(!planeta) {
      return res.status(404).send({
        message: "Planeta com o id " + req.params.id + " não foi encontrado"
      });
    }
    res.send(planeta);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Planeta com o id " + req.params.id + " não foi encontrado"
      });                
    }
    return res.status(500).send({
      message: "Error ao buscar o planeta com o id " + req.params.id
    });
  });
};

exports.delete = (req, res) => {
  Planeta.findByIdAndRemove(req.params.id).then(planeta => {
    if(!planeta) {
      return res.status(404).send({
        message: "Planeta com o id " + req.params.id + " não foi encontrado"
      });
    }
    
    res.send({message: "Planeta excluído com sucesso"});
    
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Planeta com o id " + req.params.id + " não foi encontrado"
      });                
    }

    return res.status(500).send({
        message: "Error ao excluir o planeta com o id " + req.params.id
    });
  });
};

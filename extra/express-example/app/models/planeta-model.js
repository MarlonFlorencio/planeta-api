const mongoose = require('mongoose');

const PlanetaSchema = mongoose.Schema({
  nome: String,
  clima: String,
  terreno: String,
  aparicoesEmFilmes: String
}, {
  versionKey: false,
  toJSON: {virtuals: true},
});

PlanetaSchema.virtual('url').get(function() {
  return `http://localhost:3000/planetas/${this._id}`;
});

PlanetaSchema.virtual('id').get(function() {
  return undefined;
});

module.exports = mongoose.model('Planeta', PlanetaSchema);

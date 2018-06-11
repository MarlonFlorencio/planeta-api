import * as mongoose from 'mongoose'
import {environment} from '../common/environment'

export interface Planeta extends mongoose.Document {
  nome: string,
  clima: string,
  terreno: string,
  aparicoesEmFilmes: string
}

export interface PlanetaModel extends mongoose.Model<Planeta> {
  findByNome(nome: string): Promise<Planeta>
}

const planetaSchema = new mongoose.Schema({
  nome: {
    type: String,
    unique: true,
    required: true
  },
  clima: {
    type: String,
    required: false
  },
  terreno: {
    type: String,
    required: false
  },
  aparicoesEmFilmes: {
    type: String,
    required: false
  }
})

planetaSchema.statics.findByNome = function(nome: string){
  return this.findOne({nome})
}

export const Planeta = mongoose.model<Planeta, PlanetaModel>('Planeta', planetaSchema)

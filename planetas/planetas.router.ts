import {ModelRouter} from '../common/model-router'
import * as restify from 'restify'
import {NotFoundError} from 'restify-errors'
import {Planeta} from './planetas.model'
import {findPlanetAtStarWarsApi} from './planetas.service'

class PlanetasRouter extends ModelRouter<Planeta> {

  constructor(){
    super(Planeta)
  }

  findByNome = (req, resp, next) => {
    if(req.query.nome){
      Planeta.findByNome(req.query.nome)
        .then(planeta => planeta ? [planeta] : [])
        .then(this.renderAll(resp, next, {
          pageSize: this.pageSize,
          url: req.url
        }))
        .catch(next)
    }else{
      next()
    }
  }

  findPlanetAtStarWars = (req, resp, next) => {

    req.body.aparicoesEmFilmes = undefined

    if (req.body.nome) {
      findPlanetAtStarWarsApi(req.body.nome)
        .then( response => {
          if (response.data.count > 0) {
            req.body.aparicoesEmFilmes = response.data.results[0].films.length;
          }
          next()
        })
        .catch(next)
    } else {
      next()
    }
  }

  applyRoutes(application: restify.Server){

    application.get(`${this.basePath}`, [this.findByNome, this.findAll])
    application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    application.post(`${this.basePath}`, [this.findPlanetAtStarWars, this.save])
    application.del(`${this.basePath}/:id`, [this.validateId,this.delete])

  }
}

export const planetasRouter = new PlanetasRouter()

import * as axios from 'axios'

export const findPlanetAtStarWarsApi = (nome) => {
  return (<any>axios).get(`https://swapi.co/api/planets/?search=${nome}`);
}
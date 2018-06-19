const axios = require('axios');

exports.getAparicoesEmFilmes = async (nome) => {
  
  try {
    const response = await axios.get(`https://swapi.co/api/planets/?search=${nome}`);
    if (response.data.count > 0) {
      return response.data.results[0].films.length;
    }
  } catch (error) {
    console.error(error);
  }

  return 0;
}
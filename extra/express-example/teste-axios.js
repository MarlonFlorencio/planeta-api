const axios = require('axios');

async function getAparicoes() {
  try {
    const response = await axios.get('https://swapi.co/api/planets/?search=Alderaan');
    if (response.data.count > 0) {
      return response.data.results[0].films.length;
    }
  } catch (error) {
    console.error(error);
  }
}

getAparicoes().then( (response) => response);



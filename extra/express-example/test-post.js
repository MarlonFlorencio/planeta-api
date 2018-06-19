var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/planetas',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function (res) {
    console.log(res.statusCode);
    res.on('data', function (body) {
        console.log('' + body);
    });
});

var payload = {
    "nome": "Alderaan"
    //"clima": "Cl B",
    //"terreno":"Trn C" 
}

client.end(JSON.stringify(payload));
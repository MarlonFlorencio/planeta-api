# Aplicação RESTFul API em Node.Js com TypeScript, Restify e Jest

## Recursos utilizados no desenvolvimento:

- Node.Js;
- TypeScript
- Restify;
- Axios;
- MongoDB;
- Mongoose;
- Jest;
- SuperTest;


## Pre-Requisitos

Antes de instalar as dependências no projeto, você precisa já ter instalado na sua máquina:

* **Node.Js**
* **MongoDb**: A aplicação vai buscar p serviço na porta 27017, caso necessário, alterar esse valor na aplicação.
* **TypeScript**: Para o Transpiling de TypeScript para JavaScript. Para instalar, executar o comando:
```
npm i -g typescript@2.6.2
```
* **Nodemon**: Não é obrigatório, porém agiliza muito no processo de desenvolvimento. Para instalar, executar o comando:
```
npm i -g nodemon
```

## Execução   

### Instalação das dependências

Depois de criar uma cópia do projeto, executar p seguinte comando na raiz do projeto:
```
npm install
```

### Testando
Após a instalação da dependências, podemos verificar se está tudo certo.
Para executar os teste, utilizar o seguinte comando:
```
npm test
```

### Transpiling
Para executar o código feito em typescript, é necessário executar o transpiling do código. 
Após a execução, o código será gerado na **dist** em formato Javascript. 
Vamos adicionar o parâmetro '-w' para manter o processo em modo watch. Assim, qualquer arquivo que for alterado , será convertido em JavaScript.
```
tsc -w
```

### Executando Localmente
Com o código pronto, executar o **nodemon** ou o **node**.
```
nodemon dist/main.js
```


### Acessando os endpoint

* **Buscar todos os planetas**: 
```
( GET ) http://localhost:3000/planetas
```

* **Buscar um planeta pelo nome**: 
```
( GET ) http://localhost:3000/planetas?-nome=Exemplo
```

* **Buscar um planeta pelo id**:  
```
( GET ) http://localhost:3000/planetas/:id
```

* **Deletar um planeta**:
```
( DELETE ) http://localhost:3000/planetas/:id
```

* **Incluir um novo planeta: 
```
( POST ) http://localhost:3000/planetas

PAYLOAD 
{

}
```

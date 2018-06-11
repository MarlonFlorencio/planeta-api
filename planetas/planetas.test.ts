import 'jest'
import * as request from 'supertest'

let address: string = (<any>global).address

test('get /planetas', () => {
  return request(address)
    .get('/planetas')
    .then(response=>{
      expect(response.status).toBe(200)
      expect(response.body.items).toBeInstanceOf(Array)
    })
    .catch(fail)
})

test('post /planetas', () => {
  return request(address)
    .post('/planetas')
    .send({
      nome: 'Bespin',
      clima: 'Árido',
      terreno: 'Deserto'
    })
    .then(response=>{
      expect(response.status).toBe(200)
      expect(response.body._id).toBeDefined()
      expect(response.body.nome).toBe('Bespin')
      expect(response.body.clima).toBe('Árido')
      expect(response.body.terreno).toBe('Deserto')
      expect(response.body.aparicoesEmFilmes).toBe('1')
    })
    .catch(fail)
})

test('post /planetas - nome obrigatorio', () => {
  return request(address)
    .post('/planetas')
    .send({
      clima: 'Polar'
    })
    .then(response=>{
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeInstanceOf(Array)
      expect(response.body.errors[0].message).toContain('`nome` is required.')
    })
    .catch(fail)
})

test('post /planetas - nome duplicado', () => {
  return request(address)
    .post('/planetas')
    .send({
      nome: 'Coruscant',
      clima: 'Polar'
    })
    .then(response =>
      request(address)
        .post('/planetas')
        .send({
          nome: 'Coruscant',
          clima: 'Polar'
        }))
    .then(response=>{
      expect(response.status).toBe(400)
      expect(response.body.message).toContain('E11000 duplicate key')
    })
    .catch(fail)
})

test('get /planetas - findByNome', () => {
  return request(address)
  .post('/planetas')
  .send({
    nome: 'Planeta3',
    clima: 'Polar',
    terreno: 'Montanhoso'
  })
  .then(response => 
    request(address)
    .get('/planetas')
    .query({nome: 'Planeta3'})  
  )
  .then(response => {
    expect(response.status).toBe(200)
    expect(response.body.items).toBeInstanceOf(Array)
    expect(response.body.items).toHaveLength(1)
    expect(response.body.items[0].nome).toBe('Planeta3')
    expect(response.body.items[0].clima).toBe('Polar')
  }).catch(fail)
})

test('get /planetas/:id', () => {
  return request(address)
  .post('/planetas')
  .send({
    nome: 'Alderaan',
    clima: 'Polar',
    terreno: 'Montanhoso'
  })
  .then(response => 
    request(address).get(`/planetas/${response.body._id}`)
  )
  .then(response=>{
    expect(response.status).toBe(200)
    expect(response.body.nome).toBe('Alderaan')
    expect(response.body.clima).toBe('Polar')
    expect(response.body.terreno).toBe('Montanhoso')
    expect(response.body.aparicoesEmFilmes).toBe('2')
  })
  .catch(fail)
})

test('get /planetas/aaaaaaaaa - not found', () => {
  return request(address)
    .get('/planetas/aaaaaaaaa')
    .then(response=>{
      expect(response.status).toBe(404)
    })
    .catch(fail)
})

test('delete /planetas:/id', () => {
  return request(address)
    .post('/planetas')
    .send({
      nome: 'Planeta5'
    })
    .then(response => 
      request(address)
        .delete(`/planetas/${response.body._id}`)
    )
    .then(response=>{
      expect(response.status).toBe(204)
    })
    .catch(fail)
  
})

test('delete /planetas/aaaaaaaaa - not found', () => {
  return request(address)
    .delete(`/planetas/aaaaaaaaa`)
    .then(response=>{
      expect(response.status).toBe(404)
    })
    .catch(fail)
})

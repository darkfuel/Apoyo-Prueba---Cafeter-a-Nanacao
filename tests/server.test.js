const request = require('supertest')
const server = require('../index')

const id = Math.floor(Math.random() * 9999999)
const coffee = { id, nombre: 'test_coffe2' }

describe('Operaciones CRUD', () => {

  test('REQ1 [GET /cafes] retornar 200 y array con almenos 1 objeto', async () => {
    const response = await request(server).get('/cafes').send()
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })

  test('REQ2 [DELETE /cafes/:id] retornar 404 cuando el id no existe', async () => {
    const response = await request(server)
      .delete('/cafes/invalid_id')
      .set('Authorization', 'invalid_token')
      .send()
    expect(response.status).toBe(404)
  })

  test('REQ3 [POST /cafes] retorna un 201 cuando se agrega un nuevo cafe', async () => {
    const response = await request(server).post('/cafes').send(coffee)
    expect(response.status).toBe(201)
    expect(response.body).toContainEqual(coffee)
  })

  test('REQ4 [PUT /cafes/:id] retorna un 400 cuando intenta actualizar un cafe donde no correspondan los id', async () => {
    const response = await request(server).put('/cafes/invalid_coffee_id').send(coffee)
    expect(response.status).toBe(400)
  })

  test('REQ5 [DELETE /cafes/:id] retornar 400 cuando no existe token', async () => {
    const response = await request(server)
      .delete('/cafes/invalid_id')
      .send()
    expect(response.status).toBe(400)
  })

  // REQ6 para que sea valido, hay que reemplazar el id por uno existente en la línea 5
  // test('REQ6 [POST /cafes/:id] retornar 400 cunado exista el id repetido', async () => {
  //   const response = await request(server).post('/cafes').send(coffee)
  //   expect(response.status).toBe(400)
  // })
})

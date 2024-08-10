const request = require('supertest')
const server = require('../index')

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
    const id = Math.floor(Math.random() * 9999999)
    const coffee = { id, nombre: 'test_coffe' }
    const response = await request(server).post('/cafes').send(coffee)
    expect(response.status).toBe(201)
    expect(response.body).toContainEqual(coffee)
  })
  
  // test('', async () => {})
})

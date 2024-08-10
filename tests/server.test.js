const request = require('supertest')
const server = require('../index')

describe('Operaciones CRUD', () => {
  test('REQ1 [GET / cafes] retornar 200 y array con almenos 1 objeto', async () => {
    const response = await request(server).get('/cafes').send()
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
    expect(response.body.length).toBeGreaterThanOrEqual(1)
  })

  // test('', async () => {})
  // test('', async () => {})
  // test('', async () => {})
})

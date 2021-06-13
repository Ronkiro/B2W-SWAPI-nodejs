/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const request = require('supertest');
const config = require('config');
const chai = require('chai');

const { assert, expect } = chai;
const host = config.app.address;
const apiVersionRoute = '/api/v1';

describe('POST /planets', function description() {
  this.timeout(5000);
  it('responds with json', (done) => {
    request(host)
      .post(`${apiVersionRoute}/planets`)
      .send({
        name: 'Tatooine',
        terrain: 'Teste',
        climate: 'Teste',
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('has the correct structure', async () => {
    const data = await request(host).post(`${apiVersionRoute}/planets`).send({
      name: 'Tatooine',
      terrain: 'Teste',
      climate: 'Teste',
    });
    assert.hasAllKeys(data.body, ['data', 'status', 'error', 'msg']);
  });

  it('returns invalid when using wrong schema', (done) => {
    request(host)
      .post(`${apiVersionRoute}/planets`)
      .send({
        name: 'Tatooine',
        terrain: 'Teste',
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('returns error when using wrong schema', async () => {
    const data = await request(host).post(`${apiVersionRoute}/planets`).send({
      name: 'Tatooine',
      terrain: 'Teste',
    });
    expect(data.body.error.exists).to.equal(true);
  });
});

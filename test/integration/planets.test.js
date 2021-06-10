/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const request = require('supertest');
const config = require('config');

const host = config.app.address;
const apiVersionRoute = '/api/v1';

describe('GET /planets', () => {
  it('responds with json', (done) => {
    request(host)
      .get(`${apiVersionRoute}/planets`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

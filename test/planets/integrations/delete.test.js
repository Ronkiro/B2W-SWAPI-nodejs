/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const request = require('supertest');
const config = require('config');
const chai = require('chai');

const { expect } = chai;
const host = config.app.address;
const apiVersionRoute = '/api/v1';

describe('DELETE /planets', () => {
  it('responds with json', (done) => {
    request(host)
      .del(`${apiVersionRoute}/planets`)
      .send({
        id: '60c644532a7c9a373398a276',
      })
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('deletes item by url (depends on create and get)', async () => {
    await request(host)
      .post(`${apiVersionRoute}/planets`)
      .send({
        name: 'Tatooine',
        terrain: 'Teste',
        climate: 'Teste',
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const data = await request(host)
      .get(`${apiVersionRoute}/planets`);

    await request(host)
      .del(`${apiVersionRoute}/planets/${data.body.data[0].id}`)
      .expect('Content-Type', /json/)
      .expect(200);

    const getData = await request(host)
      .get(`${apiVersionRoute}/planets?id=${data.body.data.id}`);

    return expect(getData.body.data).to.have.length(0);
  });
});

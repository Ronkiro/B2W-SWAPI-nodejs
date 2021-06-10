/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';
const request = require('supertest');
const config = require('config');
const chai = require('chai');

const { assert, expect } = chai;
const host = config.app.address;
const apiVersionRoute = '/api/v1';

describe('GET /planets', () => {
  it('responds with json', (done) => {
    request(host)
      .get(`${apiVersionRoute}/planets`)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('has the correct structure', async () => {
    const data = await request(host).get(`${apiVersionRoute}/planets`);
    assert.hasAllKeys(data.body, ['data', 'status', 'error', 'msg']);
  });

  it('returns empty when checking invalid search', async () => {
    const data = await request(host).get(
      `${apiVersionRoute}/planets?search=ThisIsATestDoNotCreateMe`,
    );
    expect(data)
      .to.have.property('body')
      .that.satisfy((body) => {
        expect(body.data).to.be.instanceof(Array);
        expect(body.data).to.have.length(0);
        return true;
      });
  });

  it('returns empty when checking invalid id', async () => {
    const data = await request(host).get(
      `${apiVersionRoute}/planets?id=ThisIsATestDoNotCreateMe`,
    );

    expect(data)
      .to.have.property('body')
      .that.satisfy((body) => {
        expect(body.data).to.be.instanceof(Array);
        expect(body.data).to.have.length(0);
        return true;
      });
  });

  it('returns OK when trying to inject', (done) => {
    request(host)
      .get(`${apiVersionRoute}/planets?search='ThisIsATestDoNotCreateMe`)
      .expect(200, done);
  });
});

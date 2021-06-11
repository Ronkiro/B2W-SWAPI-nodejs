/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const { del } = require('../../../src/features/planets/actions');

const { expect, assert } = chai;

describe('DELETE /planets', () => {
  let mockData;
  let req;
  let res;

  beforeEach(() => {
    mockData = {
      filmsCount: 5,
      name: 'Tatooine',
      terrain: 'Teste',
      climate: 'Teste',
      createdAt: '2021-06-11T19:07:54.188Z',
      updatedAt: '2021-06-11T19:07:54.188Z',
      __v: 0,
      id: '60c3b48abcd36a00147c459a',
    };
    req = {
      params: {
        id: '60c3b48abcd36a00147c459a',
      },
      container: {
        planetsRepository: {
          delete: () => mockData,
        },
      },
    };
    res = {
      reply: (...args) => args,
    };
  });

  it('uses correct structure', async () => {
    const data = await del(req, res);

    expect(data).to.have.length(3);
  });

  it('returns ok when using correct data', async () => {
    const data = await del(req, res);

    expect(data[0]).to.be.equal(200);
  });

  it('returns success message when using correct data', async () => {
    const data = await del(req, res);

    expect(data[1]).to.contain('sucesso');
  });

  it('returns correct data when using correct data', async () => {
    const data = await del(req, res);

    assert.deepEqual(data[2], { _id: mockData.id });
  });
});

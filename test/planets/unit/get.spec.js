/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const { get } = require('../../../src/features/planets/actions');

const { expect, assert } = chai;

describe('GET /planets', () => {
  let mockData = {
    filmsCount: 5,
    name: 'Tatooine',
    terrain: 'Teste',
    climate: 'Teste',
    createdAt: '2021-06-11T19:07:54.188Z',
    updatedAt: '2021-06-11T19:07:54.188Z',
    __v: 0,
    id: '60c3b48abcd36a00147c459a',
  };

  let req = {
    query: {
      id: '60c3b48abcd36a00147c459a',
      page: 1,
      search: '60c3b48abcd36a00147c459a',
    },
    container: {
      planetsRepository: {
        delete: () => mockData,
      },
    },
  };

  let res = {
    reply: (...args) => args,
  };

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
      query: {
        id: '60c3b48abcd36a00147c459a',
        page: 1,
        search: '60c3b48abcd36a00147c459a',
      },
      container: {
        planetsRepository: {
          search: () => mockData,
          searchId: () => mockData,
          findAll: () => mockData,
        },
      },
    };
    res = {
      reply: (...args) => args,
    };
  });

  it('uses correct structure', async () => {
    const data = await get(req, res);

    expect(data).to.have.length(3);
  });

  it('returns ok when using correct data', async () => {
    const data = await get(req, res);

    expect(data[0]).to.be.equal(200);
  });

  it('returns success message when using correct data', async () => {
    const data = await get(req, res);

    expect(data[1]).to.contain('sucesso');
  });

  it('returns correct data when using correct data', async () => {
    const data = await get(req, res);

    assert.deepEqual(data[2], mockData);
  });

  it('returns 400 when using incorrect data', async () => {
    req.query.id = 'Tatooine';
    req.query.search = '';

    // eslint-disable-next-line no-throw-literal
    req.container.planetsRepository.searchId = () => { throw { name: 'CastError', message: 'Test Error' }; };
    const data = await get(req, res);

    expect(data[0]).to.equals(400);
  });
});

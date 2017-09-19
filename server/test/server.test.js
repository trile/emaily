const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Greeting} = require('../models/greeting');
const {greetings, populateGreetings} = require('./seed/seed');

beforeEach(populateGreetings);

describe('GET /404error', () => {
  let text = "Path not found";
  it('should receive 404 error', (done) => {
    request(app)
      .get('/404error')
      .expect(404)
      .expect((res) => {
        expect(res.error.text).toBe(text);
      })
      .end(done);
  });
});

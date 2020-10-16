import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../setup/schema';


describe("user queries", () => {
  let server;

  beforeAll(() => {
    server = express();

    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    )
  })

  it('returns all subscriptions', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ subscriptions {id user{id name} crate{id name}}}'})
      .expect(200)
    //console.log(response.body.data)
  })
});
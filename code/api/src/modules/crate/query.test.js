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
  it('returns all crates', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ crates(orderBy: "Desc") { id name description } }' })
      .expect(200)

    console.log(response.body.data)
    expect(response.body.data.crates.length).toEqual(6)
    expect(response.body.data.crates[0].id).toEqual(6)
    expect(response.body.data.crates[0].name).toEqual("Clothes and Accessories for Women")
    expect(response.body.data.crates[0].description).toEqual('A monthly supply of trendy clothes and accessories for women')
  })
});

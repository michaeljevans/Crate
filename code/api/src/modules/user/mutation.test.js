import express from 'express';
import request from 'supertest';
import schema from '../../setup/schema';
import graphqlHTTP from 'express-graphql';

describe('user mutations', () => {
  let server;

  beforeAll(() => {
    server = express();
    server.use(
      '/',
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
  });

  // Create User
  it('users can be created', async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userSignup(email: "buster@crate.com", name: "Buster", password: "hello") { id name email } }' })
      .expect(200)

    expect(typeof(response.body.data.userSignup.id)).toEqual('number');
    expect(response.body.data.userSignup.name).toEqual('Buster');
    expect(response.body.data.userSignup.email).toEqual('buster@crate.com');
  });

  it('users can be updated', async () => {
    const response = await request(server)
      .post('/')
      .send({ query: 'mutation { userUpdate(id: 3, style: "Punk Rock") { name style } }' })
      .expect(200)

    expect(response.body.data.userUpdate.name).toEqual('Tobias');
    expect(response.body.data.userUpdate.style).toEqual('Punk Rock');
  });
});

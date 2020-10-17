import express from 'express';
import request from 'supertest';
import schema from '../../setup/schema';
import graphqlHTTP from 'express-graphql';

<<<<<<< HEAD
describe('user queries', () => {
=======
describe("user queries", () => {
>>>>>>> Working on survey resolver
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

  // All Users
  it('returns all users', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ users { id name email } }' })
      .expect(200)

    expect(response.body.data.users.length).toEqual(4);
  });

  // User by ID
  it('users have attributes', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ user(id: 3) { id name email style role } }' })
      .expect(200)

    expect(response.body.data.user.id).toEqual(3);
    expect(response.body.data.user.name).toEqual('Tobias');
    expect(response.body.data.user.email).toEqual('tobias@crate.com');
    expect(response.body.data.user.style).toEqual(null);
    expect(response.body.data.user.role).toEqual('USER');
  });

  // User Login
  it('users can log in', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ userLogin(email: "tobias@crate.com", password: "hello") { token user{ name email } } }' })
      .expect(200)

    expect(typeof(response.body.data.userLogin.token)).toEqual('string');
    expect(response.body.data.userLogin.user.name).toEqual('Tobias');
    expect(response.body.data.userLogin.user.email).toEqual('tobias@crate.com');
  });
<<<<<<< HEAD

});
=======
 })
>>>>>>> Working on survey resolver

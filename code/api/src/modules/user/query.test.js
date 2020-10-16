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

  it('returns all users', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ users { id email name } }'})
      .expect(200)

    //console.log(response.body.data)
    expect(response.body.data.users.length).toEqual(2)
  })

  it('returns user by id', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ user(id: 2) { id email name } }'})
      .expect(200)

    expect(response.body.data.user.name).toEqual('The User')
  })

  it('can log in a user', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ userLogin(email: "user@crate.com", password: "123456") { user{ name email style} } }'})
      .expect(200)

    //console.log(response.body.data.userLogin.user)
    expect(response.body.data.userLogin.user.name).toEqual('The User')
    expect(response.body.data.userLogin.user.email).toEqual('user@crate.com')
    expect(response.body.data.userLogin.user.style).toEqual('Punk rock')   
  })

  it('can return all genders and ids', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{ userGenders{ id name}}'})
      .expect(200)

    //console.log(response.body.data.userGenders)
    expect(response.body.data.userGenders[0].id).toEqual(1)
    expect(response.body.data.userGenders[0].name).toEqual('Male')
    expect(response.body.data.userGenders[1].id).toEqual(2)
    expect(response.body.data.userGenders[1].name).toEqual('Female')
  })
});
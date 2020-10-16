import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../setup/schema';
import { isType } from 'graphql';


describe("product queries", () => {
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

  it('can return all products', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{products{ id name description gender slug image}}'})
      .expect(200)
    //console.log(response.body.data.products)
    expect(response.body.data.products.length).toEqual(8)
    expect(response.body.data.products[0].name).toEqual('T-Shirt for Men - Grey')
    expect(response.body.data.products[0].description).toEqual('A very nice grey t-shirt for men.')
    expect(response.body.data.products[0].slug).toEqual('t-shirt-for-men-grey')
    expect(response.body.data.products[0].image).toEqual('/images/stock/t-shirt-male-2.jpg')
  })

  it('can return a product by id', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{productById(productId: 8) {id image name}}'})
      .expect(200)
    //console.log(response.body.data)
    expect(response.body.data.productById.id).toEqual(8)
    expect(response.body.data.productById.image).toEqual('/images/stock/t-shirt-male-2.jpg')
    expect(response.body.data.productById.name).toEqual("T-Shirt for Men - Grey")
  })

  it('can return a product by slug', async () => {
    const response = await request(server)
      .get('/')
      .send({ query: '{product(slug: "t-shirt-for-men-grey") {id image name slug }}'})
      .expect(200)
    console.log(response.body.data)
    expect(response.body.data.product.slug).toEqual("t-shirt-for-men-grey")
    expect(response.body.data.product.name).toEqual('T-Shirt for Men - Grey')
    expect(response.body.data.product.id).toEqual(8)
    expect(response.body.data.product.image).toEqual('/images/stock/t-shirt-male-2.jpg')
  })
});
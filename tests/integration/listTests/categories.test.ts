import supertest from "supertest";
import app, { init } from '../../../src/app';
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../../utils/database";
import faker from 'faker';
import Category from "../../../src/entities/Category";
import { createCategory } from "../../factories/categoryFactory";


describe('GET /list/categories', () => {
  beforeAll(async () => {
        await init();
  })
  afterAll(async () => {
    await clearDatabase();
    await getConnection().close();
  })

  it('Should return 404 when is empty', async () => {
    const result = await supertest(app)
    .get(`/list/categories`);
    expect(result.status).toEqual(404);
  })

  it('Should return teachers when id not empty', async () => {
    const name = faker.name.findName();
    await createCategory({name});

    const objCreated = await getRepository(Category).find({name})
    const result = await supertest(app)
    .get(`/list/categories`);
    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(objCreated)
  })
})

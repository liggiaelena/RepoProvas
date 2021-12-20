import supertest from "supertest";
import app, { init } from '../../../src/app';
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../../utils/database";
import faker from 'faker';
import { createTeacher } from "../../factories/teacherFactory";
import Teacher from "../../../src/entities/Teachers";


describe('GET /list/teachers', () => {
  beforeAll(async () => {
        await init();
  })
  afterAll(async () => {
    await clearDatabase();
    await getConnection().close();
  })

  it('Should return 404 when is empty', async () => {
    const result = await supertest(app)
    .get(`/list/teachers`);
    expect(result.status).toEqual(404);
  })

  it('Should return teachers when id not empty', async () => {
    const name = faker.name.findName();
    await createTeacher({name});

    const objCreated = await getRepository(Teacher).find({name})
    const result = await supertest(app)
    .get(`/list/teachers`);
    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(objCreated)
  })
})

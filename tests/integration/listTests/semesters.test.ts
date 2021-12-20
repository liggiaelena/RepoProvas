import supertest from "supertest";
import app, { init } from '../../../src/app';
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../../utils/database";
import faker from 'faker';
import Semester from "../../../src/entities/Semester";
import { createSemester } from "../../factories/semesterFactory";


describe('GET /list/semesters', () => {
  beforeAll(async () => {
        await init();
  })
  afterAll(async () => {
    await clearDatabase();
    await getConnection().close();
  })

  it('Should return 404 when is empty', async () => {
    const result = await supertest(app)
    .get(`/list/semesters`);
    expect(result.status).toEqual(404);
  })

  it('Should return teachers when id not empty', async () => {
    const name = faker.name.findName();
    await createSemester({name});

    const objCreated = await getRepository(Semester).find({name})
    const result = await supertest(app)
    .get(`/list/semesters`);
    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(objCreated)
  })
})
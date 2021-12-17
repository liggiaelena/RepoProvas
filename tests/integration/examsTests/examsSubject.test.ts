import supertest from "supertest";
import app, { init } from '../../../src/app';
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../../utils/database";
import { createExam } from "../../factories/examFactory";
import Subject from "../../../src/entities/Subject";
import faker from 'faker';
import Category from "../../../src/entities/Category";
import Exam from "../../../src/entities/Exam";

describe('GET /exams/subject/:subjectId/category/:categoryId', () => {
  beforeAll(async () => {
          await init();
          await clearDatabase();
  })
  afterAll(async () => {
    await clearDatabase();
    await getConnection().close();
  })
  
  it('Should return 400 when any id is not valid', async () => {
    const wrongId = "string";
    const fakeId = faker.datatype.number();
    const result = await supertest(app)
    .get(`/exams/subject/${fakeId}/category/${wrongId}`);
     expect(result.status).toEqual(400);
  })
  
  it('Should return 404 when any id do not exists', async () => {
    const fakeId = faker.datatype.number();
    const result = await supertest(app)
    .get(`/exams/subject/${fakeId}/category/${fakeId}`);
    expect(result.status).toEqual(404);
  })
  
  it('Should return exams when both ids are valid', async () => {
    const name = faker.name.findName();
    const link = faker.internet.url();
    await createExam(name, link);

    const subject = await getRepository(Subject).find()
    const category = await getRepository(Category).find();
    const exam = await getRepository(Exam).find({
      relations:['teacher','subject', 'category']
    })
    const result = await supertest(app)
    .get(`/exams/subject/${subject[0].id}/category/${category[0].id}`);
    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(exam)
  })
})
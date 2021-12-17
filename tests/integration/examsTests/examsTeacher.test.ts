import supertest from "supertest";
import app, { init } from '../../../src/app';
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../../utils/database";
import { createExam } from "../../factories/examFactory";
import Teacher from "../../../src/entities/Teachers";
import faker from 'faker';
import Exam from "../../../src/entities/Exam";
import Category from "../../../src/entities/Category";

describe('GET /exams/teacher/:teacherId/category/:categoryId', () => {
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
    .get(`/exams/teacher/${fakeId}/category/${wrongId}`);
     expect(result.status).toEqual(400);
  })
  
  it('Should return 404 when any id do not exists', async () => {
    const fakeId = faker.datatype.number();
    const result = await supertest(app)
    .get(`/exams/teacher/${fakeId}/category/${fakeId}`);
    expect(result.status).toEqual(404);
  })
  
  it('Should return exams when both ids are valid', async () => {
    const fakeName = faker.name.findName();
    const fakeLink = faker.internet.url();
    await createExam(fakeName, fakeLink);

    const teacher = await getRepository(Teacher).find();
    const category = await getRepository(Category).find();
    const exam = await getRepository(Exam).find({
      relations:['teacher','subject', 'category']
    })
    console.log(teacher, category)
    const result = await supertest(app)
    .get(`/exams/teacher/${teacher[0].id}/category/${category[0].id}`);
    expect(result.status).toEqual(200);
    expect(result.body).toMatchObject(exam)
  })
})
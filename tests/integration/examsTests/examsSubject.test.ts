// import supertest from "supertest";
// import app, { init } from '../../../src/app';
// import { getConnection, getRepository } from "typeorm";
// import { clearDatabase } from "../../utils/database";
// import { createExam } from "../../factories/examFactory";
// import Subject from "../../../src/entities/Subject";
// import faker from 'faker';

// describe('GET /exams/teacher/:id', () => {
//   beforeAll(async () => {
//           await init();
//           await clearDatabase();
//   })
//   afterAll(async () => {
//     await clearDatabase();
//     await getConnection().close();
//   })
  
//   it('Should return 400 when id is not valid', async () => {
//     const id = "string";
//     const result = await supertest(app)
//     .get(`/exams/subject/${id}`);
//      expect(result.status).toEqual(400);
//   })
  
//   it('Should return 404 when id no exists', async () => {
//     const id = faker.datatype.number();
//     const result = await supertest(app)
//     .get(`/exams/subject/${id}`);
//     expect(result.status).toEqual(404);
//   })
  
//   it('Should return exams when id is valid', async () => {
//     const name = faker.name.findName();
//     const nameSubjectFake = faker.name.findName();
//     const link = faker.internet.url();
//     await createExam(name, link, undefined , nameSubjectFake);

//     const subject = await getRepository(Subject).find({name: nameSubjectFake})
//     const result = await supertest(app)
//     .get(`/exams/subject/${subject[0].id}`);
//     expect(result.status).toEqual(200);
//     expect(result.body.length).toBeGreaterThan(0)
//   })
// })
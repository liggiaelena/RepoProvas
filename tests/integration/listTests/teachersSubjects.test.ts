import supertest from "supertest";
import app, { init } from '../../../src/app';
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../../utils/database";
import faker from 'faker';
import { createSubject } from "../../factories/subjectFactory";
import Subject from "../../../src/entities/Subject";
import { createSemester } from "../../factories/semesterFactory";
import Semester from "../../../src/entities/Semester";
import Teacher from "../../../src/entities/Teachers";
import { createTeacher } from "../../factories/teacherFactory";
import TeacherSubject from "../../../src/entities/TeacherSubject";




describe('GET /list/teachers/:subjectId', () => {
  beforeAll(async () => {
        await init();
  })
  afterAll(async () => {
    await clearDatabase();
    await getConnection().close();
  })

  it('Should return 400 when id is not valid', async () => {
    const id = "string";
    const result = await supertest(app)
    .get(`/list/teachers/${id}`);
    expect(result.status).toEqual(400);
  })

  it('Should return 404 when is empty', async () => {
    const id = faker.datatype.number();
    const result = await supertest(app)
    .get(`/list/teachers/${id}`);
    expect(result.status).toEqual(404);
  })

  it('Should return 200 when id not empty', async () => {
    const name = faker.name.findName();
    await createTeacher({name})
    const teacher = await getRepository(Teacher).find({name})
    await createSemester({name})
    const semester = await getRepository(Semester).find({name})
    await createSubject({name, semester: semester[0].id})
    const subject = await getRepository(Subject).find({name})
    await getRepository(TeacherSubject).insert({subjectId: subject[0].id, teacherId: teacher[0].id});

    const result = await supertest(app)
    .get(`/list/teachers/${subject[0].id}`);
    expect(result.status).toEqual(200);
  })
})
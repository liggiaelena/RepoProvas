import supertest from "supertest";
import app, { init } from '../../../src/app';
import { getConnection, getRepository } from "typeorm";
import { clearDatabase } from "../../utils/database";
import Exam from "../../../src/entities/Exam";
import faker from 'faker';
import { link } from "joi";
import { createTeacher } from "../../factories/teacherFactory";
import { createSemester } from "../../factories/semesterFactory";
import { createSubject } from "../../factories/subjectFactory";
import { createCategory } from "../../factories/categoryFactory";
import Teacher from "../../../src/entities/Teachers";
import Semester from "../../../src/entities/Semester";
import Subject from "../../../src/entities/Subject";
import Category from "../../../src/entities/Category";

const wrongBody = {
    year:"2019",
    link: "",
}

describe('POSt /exams', () => {
  beforeAll(async () => {
        await init();
  })
  afterAll(async () => {
    await clearDatabase();
    await getConnection().close();
  })

  it('Should return 400 when body is not valid', async () => {
    const result = await supertest(app)
    .post('/exams').send(wrongBody);
    expect(result.status).toEqual(400);
  })

  it('Should return 201 when body is valid', async () => {
    const nameTeacherFake = faker.name.findName();
    await createTeacher({name: nameTeacherFake});
    const teacher = await getRepository(Teacher).find({name: nameTeacherFake});

    const nameSemester = faker.name.findName();
    await createSemester({name: nameSemester});
    const semester = await getRepository(Semester).find({name: nameSemester});

    const nameSubjectFake = faker.name.findName();
    await createSubject({name: nameSubjectFake, semester: semester[0].id});
    const subject = await getRepository(Subject).find({name:nameSubjectFake});

    const nameCategory = faker.name.findName();
    await createCategory({name: nameCategory});
    const category = await getRepository(Category).find({name: nameCategory});

    const fakeBody = {
        year: "2020",
        semester: `${semester[0].name}`,
        link: faker.internet.url(),
        teacherId: teacher[0].id,
        subjectId: subject[0].id,
        categoryId: category[0].id,
    }
    const result = await supertest(app)
    .post('/exams').send(fakeBody);
    expect(result.status).toEqual(201);
  })
})

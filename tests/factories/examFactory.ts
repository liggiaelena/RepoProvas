import { getRepository } from "typeorm";
import { getConnection } from "typeorm";
import { createTeacher } from "./teacherFactory";
import { createSubject } from "./subjectFactory";
import { createCategory } from "./categoryFactory";
import { createSemester } from "./semesterFactory";
import Teacher from "../../src/entities/Teachers";
import Subject from "../../src/entities/Subject";
import Category from "../../src/entities/Category";
import Semester from "../../src/entities/Semester";
import Exam from "../../src/entities/Exam";
import faker from 'faker';

interface ExamCreate {
    name: string;
    link: string;
    teacher: number;
    subject: number;
    category: number;
    semester: number;
}

export async function createExam(name:string, link: string, teacherName?: string, subjectName?:string) {
    const nameTeacherFake = faker.name.findName();
    await createTeacher({name: teacherName || nameTeacherFake});
    const teacher = await getRepository(Teacher).find({name: teacherName || nameTeacherFake});

    const nameSemester = faker.name.findName();
    await createSemester({name: nameSemester});
    const semester = await getRepository(Semester).find({name: nameSemester});

    const nameSubjectFake = faker.name.findName();
    await createSubject({name: subjectName || nameSubjectFake, semester: semester[0].id});
    const subject = await getRepository(Subject).find({name: subjectName ||nameSubjectFake});

    const nameCategory = faker.name.findName();
    await createCategory({name: nameCategory});
    const category = await getRepository(Category).find({name: nameCategory});


    const exam = {
        name,
        link,
        teacher: teacher[0].id,
        subject: subject[0].id,
        category: category[0].id,
        semester: semester[0].id,
    } as ExamCreate

    await getRepository(Exam).insert(exam);
}

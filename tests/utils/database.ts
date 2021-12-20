import { getRepository } from "typeorm";
import Teacher from "../../src/entities/Teachers";
import Subject from "../../src/entities/Subject";
import Semester from "../../src/entities/Semester";
import Category from "../../src/entities/Category";
import Exam from "../../src/entities/Exam";
import TeacherSubject from "../../src/entities/TeacherSubject";

export async function clearDatabase () {
  await getRepository(TeacherSubject).delete({});
  await getRepository(Exam).delete({});
  await getRepository(Teacher).delete({});
  await getRepository(Subject).delete({});
  await getRepository(Category).delete({});
  await getRepository(Semester).delete({});
}

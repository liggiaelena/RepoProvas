import { getRepository } from "typeorm";
import Teacher from "../../src/entities/Teachers";
import Subject from "../../src/entities/Subject";
import Semester from "../../src/entities/Semester";
import Category from "../../src/entities/Category";
import Exam from "../../src/entities/Exam";

export async function clearDatabase () {
  console.log("entrei")
  await getRepository(Exam).delete({});
  await getRepository(Teacher).delete({});
  await getRepository(Subject).delete({});
  await getRepository(Category).delete({});
  await getRepository(Semester).delete({});
}

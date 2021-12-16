import { getRepository } from "typeorm";
import Teacher from "../../src/entities/Teachers";
import Subject from "../../src/entities/Subject";
import Exam from "../../src/entities/Exam";

export async function clearDatabase () {
  console.log("entrei")
  await getRepository(Teacher).delete({});
  await getRepository(Subject).delete({});
  await getRepository(Exam).delete({});
}

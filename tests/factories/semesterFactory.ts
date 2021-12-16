import { getRepository } from "typeorm";

import Semester from "../../src/entities/Semester";

interface SemesterCreate {
    name: string;
}

export async function createSemester(semester: SemesterCreate) {
    await getRepository(Semester).insert(semester);
}
import { getRepository } from "typeorm";

import Teacher from "../../src/entities/Teachers";

interface TeacherCreate {
    name: string;
}

export async function createTeacher(teacher: TeacherCreate) {
    await getRepository(Teacher).insert(teacher);
}

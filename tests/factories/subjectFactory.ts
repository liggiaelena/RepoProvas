import { getRepository } from "typeorm";

import Subject from "../../src/entities/Subject";

interface SubjectCreate {
    name: string;
    semester: number;
}

export async function createSubject(subject: SubjectCreate) {
    await getRepository(Subject).insert(subject);
}

import { getRepository } from "typeorm";
import Exam from "../entities/Exam";
import Teacher from "../entities/Teachers";
import Subject from "../entities/Subject";
import NotFoundError from "../error/NotfoundError";
import NoExistError from "../error/NoExistError";

async function getTeachers() {
    const result = await getRepository(Teacher).find()
    if(result.length === 0){
        throw new NoExistError("Não há professores cadastrados")
    }
    return result;
}

export{
    getTeachers, 
}
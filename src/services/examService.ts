import { getRepository } from "typeorm";
import Exam from "../entities/Exam";
import Teacher from "../entities/Teachers";
import Subject from "../entities/Subject";
import NotFoundError from "../error/NotfoundError";
import NoExistError from "../error/NoExistError";

async function getExamById(id: number) {
    const result = await getRepository(Exam).find({ id })
    if(result.length === 0){
        throw new NoExistError("Não existe essa prova")
    }
    return result;
}

async function getAllExamsByTeachersId(id: number) {
    const exist = await getRepository(Teacher).find({id});
    if(exist.length === 0){
        throw new NoExistError("Não existe esse professor")
    }

    const result = await getRepository(Exam).find({ 
        where: { teacher: id}
    })
    if(result.length === 0){
        throw new NotFoundError("Esse professor não possui provas")
    }
    return result;
}

async function getAllExamsBySubjectId(id: number) {
    const exist = await getRepository(Subject).find({id});
    if(exist.length === 0){
        throw new NoExistError("Não existe essa matéria")
    }

    const result = await getRepository(Exam).find({ 
        where: { subject: id}
    })
    if(result.length === 0){
        throw new NotFoundError("Essa matéria não possui provas")
    }
    return result;
}

export{
    getExamById,
    getAllExamsByTeachersId,
    getAllExamsBySubjectId, 
}
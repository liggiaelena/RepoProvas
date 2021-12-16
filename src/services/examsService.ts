import { getRepository } from "typeorm";
import Exam from "../entities/Exam";

async function getExamById(id: number) {
    const result = await getRepository(Exam).find({ id })
    if(result.length === 0){
        //erro
    }
    return result;
}

async function getAllExamsByTeachersId(id: number) {
    const result = await getRepository(Exam).find({ 
        where: { teacher: id}
    })
    if(result.length === 0){
        //erro
    }
    return result;
}

async function getAllExamsBySubjectId(id: number) {
    const result = await getRepository(Exam).find({ 
        where: { subject: id}
    })
    if(result.length === 0){
        //erro
    }
    return result;
}

export{
    getExamById,
    getAllExamsByTeachersId,
    getAllExamsBySubjectId, 
}
import { getRepository } from "typeorm";
import Exam from "../entities/Exam";
import Teacher from "../entities/Teachers";
import Subject from "../entities/Subject";
import NotFoundError from "../error/NotfoundError";
import NoExistError from "../error/NoExistError";
import ExamCreate from "../interfaces/examCreateInterface"

async function getExamById(id: number) {
    const result = await getRepository(Exam).find({
        where: {id},
        relations:['teacher','subject', 'category']
    })
    if(result.length === 0){
        throw new NoExistError("Não existe essa prova")
    }
    return result;
}

async function getExamsByTeachersIdAndCategoryId(teacherId: number, categoryId: number) {
    const exist = await getRepository(Teacher).find({id: teacherId});
    if(exist.length === 0){
        throw new NoExistError("Não existe esse professor")
    }

    const result = await getRepository(Exam).find({ 
        where: { teacher: teacherId, category: categoryId},
        relations:['teacher','subject', 'category']
    })
    if(result.length === 0){
        throw new NotFoundError("Esse professor não possui provas desse tipo")
    }
    return result;
}

async function getExamsBySubjectIdAndCategoryId(subjectId: number, categoryId: number) {
    const exist = await getRepository(Subject).find({id: subjectId});
    if(exist.length === 0){
        throw new NoExistError("Não existe essa matéria")
    }

    const result = await getRepository(Exam).find({ 
        where: { subject: subjectId, category: categoryId},
        relations:['teacher','subject', 'category']
    })
    if(result.length === 0){
        throw new NotFoundError("Essa matéria não possui provas desse tipo")
    }
    return result;
}

async function postExam(body: ExamCreate) {
    const exam = {
        name: `${body.year}.${body.semester}`,
        link: body.link,
        teacher: body.teacherId,
        subject: body.subjectId,
        category: body.categoryId
    }
    const result = await getRepository(Exam).insert(exam)
    return result.identifiers[0];
}

export{
    getExamById,
    getExamsByTeachersIdAndCategoryId,
    getExamsBySubjectIdAndCategoryId,
    postExam,
}
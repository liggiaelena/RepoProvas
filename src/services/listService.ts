import { getRepository } from "typeorm";
import Exam from "../entities/Exam";
import Teacher from "../entities/Teachers";
import Subject from "../entities/Subject";
import NotFoundError from "../error/NotfoundError";
import NoExistError from "../error/NoExistError";
import Semester from "../entities/Semester";
import Category from "../entities/Category";

async function getTeachers() {
    const result = await getRepository(Teacher).find({
        relations:['exams']
    })
    if(result.length === 0){
        throw new NoExistError("Não há professores cadastrados")
    }
    
    return result;
}

async function getCategories() {
    const result = await getRepository(Category).find()
    if(result.length === 0){
        throw new NoExistError("Não há categorias cadastradas")
    }
    
    return result;
}

async function getSemester() {
    const result = await getRepository(Semester).find()
    if(result.length === 0){
        throw new NoExistError("Não há semestres cadastrados")
    }
    
    return result;
}

async function getSubjects() {
    const result = await getRepository(Subject).find()
    if(result.length === 0){
        throw new NoExistError("Não há matérias cadastradas")
    }
    
    return result;
}

async function getAllSubjectsBySemesterId(id: number) {
    const result = await getRepository(Subject).find({
        where: { semester: id},
        relations:['exams']
    });
    if(result.length === 0){
        throw new NotFoundError("Essa semestre não possui matérias")
    }
    return result;
}

export{
    getTeachers,
    getSemester,
    getCategories,
    getSubjects,
    getAllSubjectsBySemesterId,
}
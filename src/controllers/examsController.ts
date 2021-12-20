import { Request, Response, NextFunction } from "express";
import BadRequestError from "../error/BadRequestError";
import * as examsService from "../services/examService";
import examValidation from "../validation/examSchema";

async function findExamById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if(!Number(id)){
      throw new BadRequestError("id deve ser um numero")
    }
    const result = await examsService.getExamById(Number(id));
    res.status(200).send(result[0]);
  } catch (error) {
    if(error.name === 'NoExistError') {
      return res.status(404).send(error.message)
    }
    if(error.name === 'BadRequestError') {
      return res.status(400).send(error.message)
    }
    next(error)
  }
}

async function findAllExamsByTeacherId(req: Request, res: Response, next: NextFunction) {
  try {
    const { teacherId, categoryId } = req.params;
    if(!Number(teacherId) || !Number(categoryId)) {
      throw new BadRequestError("id deve ser um numero")
    }
    const result = await examsService.getExamsByTeachersIdAndCategoryId(Number(teacherId), Number(categoryId));
    res.status(200).send(result);
  } catch (error) {
    if(error.name === 'NotFoundError' || error.name === 'NoExistError') {
      return res.status(404).send(error.message)
    }
    if(error.name === 'BadRequestError') {
      return res.status(400).send(error.message)
    }
    next(error)
  }
}

async function findAllExamsBySubjectId(req: Request, res: Response, next: NextFunction) {
  try {
    const { subjectId, categoryId } = req.params;
    if(!Number(subjectId) || !Number(categoryId)){
      throw new BadRequestError("id deve ser um numero")
    }
    const result = await examsService.getExamsBySubjectIdAndCategoryId(Number(subjectId), Number(categoryId));
    res.status(200).send(result);
  } catch (error) {
    if(error.name === 'NotFoundError' || error.name === 'NoExistError') {
      return res.status(404).send(error.message)
    }
    if(error.name === 'BadRequestError') {
      return res.status(400).send(error.message)
    }
    next(error)
  }
}

async function insertExam(req: Request, res: Response, next: NextFunction) {
  try {
    const validation = examValidation.validate(req.body);
    if (validation.error) {
      throw new BadRequestError(validation.error.message)
    }
     await examsService.postExam(req.body)
    res.sendStatus(201)
    
  } catch (error) {
    if(error.name === 'NotFoundError' || error.name === 'NoExistError') {
      return res.status(404).send(error.message)
    }
    if(error.name === 'BadRequestError') {
      return res.status(400).send(error.message)
    }
    next(error)
  }
  
}

export{
  insertExam,
  findExamById,
  findAllExamsByTeacherId,
  findAllExamsBySubjectId
}
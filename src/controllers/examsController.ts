import { Request, Response, NextFunction } from "express";
import BadRequestError from "../error/BadRequestError";
import * as examsService from "../services/examService";

async function findExamById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if(!Number(id)){
      throw new BadRequestError("id deve ser um numero")
    }
    const result = await examsService.getExamById(Number(id));
    res.status(200).send(result);
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
    const { id } = req.params;
    const result = await examsService.getAllExamsByTeachersId(Number(id));
    res.status(200).send(result);
  } catch (error) {
    if(error.name === 'NotFoundError' || error.name === 'NoExisError') {
      return res.status(404).send(error.message)
    }
    next(error)
  }
}

async function findAllExamsBySubjectId(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const result = await examsService.getAllExamsBySubjectId(Number(id));
    res.status(200).send(result);
  } catch (error) {
    if(error.name === 'NotFoundError' || error.name === 'NoExisError') {
      return res.status(404).send(error.message)
    }
    next(error)
  }
}

export{
    findExamById,
    findAllExamsByTeacherId,
    findAllExamsBySubjectId
}
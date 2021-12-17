import { Request, Response, NextFunction } from "express";
import BadRequestError from "../error/BadRequestError";
import * as listService from "../services/listService";

async function listTeachers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await listService.getTeachers();
      res.status(200).send(result);
    } catch (error) {
      if(error.name === 'NoExistError') {
        return res.status(404).send(error.message)
      }
      next(error)
    }
}

async function listCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await listService.getCategories();
      res.status(200).send(result);
    } catch (error) {
      if(error.name === 'NoExistError') {
        return res.status(404).send(error.message)
      }
      next(error)
    }
}

async function listSemester(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await listService.getSemester();
      res.status(200).send(result);
    } catch (error) {
      if(error.name === 'NoExistError') {
        return res.status(404).send(error.message)
      }
      next(error)
    }
}

async function listSubjectsBySemesterId(req: Request, res: Response, next: NextFunction) {
  try {
    const { semesterId } = req.params;
    if(!Number(semesterId)){
      throw new BadRequestError("id deve ser um numero")
    }
    const result = await listService.getAllSubjectsBySemesterId(Number(semesterId));
    res.status(200).send(result);
  } catch (error) {
    if(error.name === 'NotFoundError') {
      return res.status(404).send(error.message)
    }
    if(error.name === 'BadRequestError') {
      return res.status(400).send(error.message)
    }
    next(error)
  }
}

export {
    listTeachers,
    listSemester,
    listCategories,
    listSubjectsBySemesterId,
}
import { Request, Response } from "express";
import * as examsService from "../services/examsService";

async function findAllExamsByTeacherId(req: Request, res: Response) {
  const { id } = req.params;
  const result = await examsService.getAllExamsByTeachersId(Number(id));
  res.status(200).send(result);
}


async function findExamById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await examsService.getExamById(Number(id));
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.send(500)
  }
}

async function findAllExamsBySubjectId(req: Request, res: Response) {
  const { id } = req.params;
  const result = await examsService.getAllExamsBySubjectId(Number(id));
  res.status(200).send(result);
}


export{
    findExamById,
    findAllExamsByTeacherId,
    findAllExamsBySubjectId
}
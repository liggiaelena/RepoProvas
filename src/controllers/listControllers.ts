import { Request, Response, NextFunction } from "express";
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

  export {
      listTeachers,
  }
import "./setup";
import { Request, Response } from "express"
import express from "express";
import cors from "cors";
import serverMiddlewareError from "./middlewares/serverMiddlewareError";

import connectDatabase from "./database";
import * as examsController from "./controllers/examsController";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req: Request, res: Response)=>{
  res.send("oi")
});
app.get("/exams/:id", examsController.findExamById);
app.get("/exams/teacher/:id", examsController.findAllExamsByTeacherId);
app.get("/exams/subject/:id", examsController.findAllExamsBySubjectId);

app.use(serverMiddlewareError)

export async function init () {
  await connectDatabase();
}

export default app;

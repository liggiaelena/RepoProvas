import "./setup";
import { Request, Response } from "express"
import express from "express";
import cors from "cors";
import serverMiddlewareError from "./middlewares/serverMiddlewareError";

import connectDatabase from "./database";
import * as examsController from "./controllers/examsController";
import * as listController from "./controllers/listControllers";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req: Request, res: Response)=>{
  res.send("oi")
});
app.get("/exams/:id", examsController.findExamById);
app.get("/exams/teacher/:teacherId/category/:categoryId", examsController.findAllExamsByTeacherId);
app.get("/exams/subject/:subjectId/category/:categoryId", examsController.findAllExamsBySubjectId);

app.get("/list/teachers", listController.listTeachers);
app.get("/list/categories", listController.listCategories);
app.get("/list/semesters", listController.listSemester);
app.get("/list/subjects/:semesterId", listController.listSubjectsBySemesterId);

app.use(serverMiddlewareError)

export async function init () {
  await connectDatabase();
}

export default app;

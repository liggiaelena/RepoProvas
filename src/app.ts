import "./setup";
import { Request, Response } from "express"
import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req: Request, res: Response)=>{
  res.send("oi")
});

export async function init () {
  await connectDatabase();
}

export default app;

import { Request, Response, NextFunction } from "express";

export default async function (err:Error, req: Request, res: Response, next: NextFunction) {
    console.log('SERVER ERROR: ', err);
    return res.sendStatus(500)
}
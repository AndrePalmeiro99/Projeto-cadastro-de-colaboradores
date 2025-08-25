import { NextFunction, Request, Response } from 'express';

export default function logger(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    console.info(`${timestamp} Início da captura da requisição ${req.method} e de url: ${req.url}`);
    next();
}
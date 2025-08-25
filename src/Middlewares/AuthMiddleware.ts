import express, { NextFunction, Request, Response} from 'express';

export default function checkAuth(req: Request, res: Response, next: NextFunction) {
    const authKey = req.headers['api-key'];
    if(authKey) {
        if(authKey === 'TesteSecreto') {
            next();
            return;
        }
    }
    res.status(401).json('ACESSO NEGADO');
}
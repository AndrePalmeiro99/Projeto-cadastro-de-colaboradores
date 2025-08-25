import routes from './Api/Routes';
import express, { NextFunction, Request, Response} from 'express';
import logger from './Middlewares/Logger';
import checkAuth from './Middlewares/AuthMiddleware';


const app = express();
const port = 3000;

function seguraErro(error: Error, req: Request, res: Response, next: NextFunction) {
    const status = 500;
    const message = 'Falha no servidor';

    

    console.error('status: ', status, 'message', error.message);
    res.status(status).json(message);
}

app.use(express.json());

app.use(checkAuth);

app.use(logger);
app.use('/', routes);

app.get('/', (req: Request, res: Response) => {
    res.json('Bem vindo a nossa primeira rota. :D');
});

app.use(seguraErro);

app.listen(port, () => {
    console.info(`Servidor ativo na porta: http://localhost:${port}`);
});
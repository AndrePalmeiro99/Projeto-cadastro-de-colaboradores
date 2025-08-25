import { Router } from 'express';
import usuarioRepo from '../Infra/UsuarioRepo';
import UserController from './UsuarioController';

const routes = Router();

const usuarioRepositorio = new usuarioRepo();
const usuarioController = new UserController(usuarioRepositorio);

routes.use('/usuarios', usuarioController.router);

export default routes;
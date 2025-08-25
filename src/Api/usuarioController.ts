import { Router, Request, Response } from 'express';
import usuarioRepo from '../Infra/UsuarioRepo';
import { AtualizarUsuarioDTO, criaUsuarioDTO, User, viewUsuarioDTO } from '../usuarios';
import { usuarioSchema } from '../Infra/UsuarioSchema';

class UserController {
    private readonly usuarioRepositorio: usuarioRepo;
    public router: Router = Router();

    constructor(usuarioRepositorio: usuarioRepo) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.routes();
    }

    public routes() {
        this.router.get('/', this.buscaUsuarios.bind(this));
        this.router.get('/:id', this.buscaUsuarioporID.bind(this));
        this.router.post('/', this.criaUsuario.bind(this));
        this.router.patch('/:id', this.atualizaUsuarioporID.bind(this));
        this.router.delete('/:id', this.deletaUserbyID.bind(this));
    }

    public buscaUsuarios(req: Request, res: Response) {
        const usuarios: usuarioSchema[] = this.usuarioRepositorio.getUsuarios();
        const usuarioDTO = usuarios.map(usuario => ({
            nome: usuario.nome,
            ativo: usuario.ativo,
            cargo: usuario.cargo,
            email: usuario.email
        } as viewUsuarioDTO));
        res.json(usuarioDTO);
    }

    public buscaUsuarioporID(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            res.json('Usuário não encontrado');
            return;
        }
        const usuario = this.usuarioRepositorio.getUserID(+id);
        if (usuario) {
            const usuarioDTO: viewUsuarioDTO = {
                nome: usuario.nome,
                ativo: usuario.ativo,
                cargo: usuario.cargo,
                email: usuario.email              
            };
            res.json(usuarioDTO);
        }
        res.status(404).json('Usuário não encontrado');
    }

    public criaUsuario(req: Request, res: Response) {
        const dadosUser: criaUsuarioDTO = req.body;
        let usuarios = this.usuarioRepositorio.getUsuarios();
        const idsExistentes = usuarios.map(usuario => usuario.id);
        const novoID = Math.max(...idsExistentes) + 1;
        const usuario = new User(
            novoID ?? '0',
            dadosUser.nome,
            dadosUser.ativo,
            dadosUser.cargo,
            dadosUser.email
        );
        this.usuarioRepositorio.criaUsuario(usuario);
        usuarios = this.usuarioRepositorio.getUsuarios();
        res.json(usuarios);
    };

    public atualizaUsuarioporID(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            res.json('Usuário não encontrado');
            return;
        }
        const dadosUser: AtualizarUsuarioDTO = req.body;
        const usuario = this.usuarioRepositorio.atualizaUsuario(+id, dadosUser);
        if (usuario) {
            const usuarioDTO: viewUsuarioDTO = {
                nome: usuario.nome,
                ativo: usuario.ativo,
                cargo: usuario.cargo,
                email: usuario.email              
            };
            res.json(usuarioDTO);
        }
        res.json('Usuário não encontrado');
    }

    public deletaUserbyID(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) {
            res.json('ID não enviado');
            return;
        }
        const sucesso = this.usuarioRepositorio.deletaUsuarios(+id);
        if (sucesso) {
            res.json('Usuário Removido com sucesso');
            return;
        }
        res.json('Usuário não encontrado');
    }
}



export default UserController;
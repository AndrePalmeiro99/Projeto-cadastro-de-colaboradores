import path from 'path';
import fs from 'fs';
import { DBSchema } from './DBSchema';
import { User } from '../usuarios';
import { usuarioSchema } from './UsuarioSchema';


export default class usuarioRepo {
    private filePath: string;
    constructor(caminho: string = 'BD.json') {
        this.filePath = path.join(__dirname, caminho);
    }

    private acessoBD(): DBSchema {
        const bdPuro = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(bdPuro);
    }
    private reescreverBD(bancoAtualizado: DBSchema): boolean {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(bancoAtualizado));
            return true;
        } catch {
            return false;
        }
    }

    public getUsuarios(): usuarioSchema[]{
        const bd = this.acessoBD();
        const usuarios = bd.users;
        return usuarios;
    }
    public getUserID (id: number): usuarioSchema | undefined {
        const usuarios = this.getUsuarios();
        return usuarios.find(user => user.id === id);
    }

    public criaUsuario(usuario: User): usuarioSchema[] {
        const usuarios = this.getUsuarios();
        usuarios.push(
            {...usuario}
        );
        const bdAtualizado = this.acessoBD();
        bdAtualizado.users = usuarios;
        this.reescreverBD(bdAtualizado);
        return usuarios;
    }

    public deletaUsuarios(id: number): boolean {
        const usuarios = this.getUsuarios();
        const indiceUsuario = usuarios.findIndex(user => user.id === id);

        if (indiceUsuario === -1) {
            return false;
        }

        usuarios.splice(indiceUsuario, 1);
        const bdAtualizado = this.acessoBD();
        bdAtualizado.users = usuarios;

        return this.reescreverBD(bdAtualizado);
    }

    public atualizaUsuario(id: number, dadosAtualizados: Partial<User>): usuarioSchema | null {
        const usuarios = this.getUsuarios();
        const indiceUsuario = usuarios.findIndex(user => user.id === id);

        if (indiceUsuario === -1) {
            return null;
        }

        usuarios[indiceUsuario] = {
            ...usuarios[indiceUsuario],
            ...dadosAtualizados,
            id
        };

        const bdAtualizado = this.acessoBD();
        bdAtualizado.users = usuarios;

        const sucesso = this.reescreverBD(bdAtualizado);
        return sucesso ? usuarios[indiceUsuario] : null;
    }
}
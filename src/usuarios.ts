export class User {
    id: number;
    nome: string = 'André';
    ativo: boolean = true;
    email?: string;
    cargo: string;
    senha?: string;
    

    constructor(id: number, nome: string,ativo: boolean, cargo: string, email: string) {
        // this.id = Math.round(Math.random() * 100);
        this.id = id;
        this.nome = nome;
        this.ativo = ativo;
        this.cargo = cargo;
        this.email = email;
        this.senha = 'minha senha';
    }
}

export type criaUsuarioDTO = {
    nome: string;
    ativo: boolean;
    email: string;
    cargo: string;
    senha?: string;
}

export type AtualizarUsuarioDTO = Partial<criaUsuarioDTO>

export type viewUsuarioDTO = {
    nome: string;
    ativo: boolean;
    cargo: string;
    email?: string;
}
export type usuarioSchema = {
    id: number,
    nome: string,
    ativo: boolean,
    email?: string,
    contato?: {[key: string]: unknown},
    cargo: string;
}
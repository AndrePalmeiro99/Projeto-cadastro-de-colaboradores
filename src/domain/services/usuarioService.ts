//Criando o CRUD

import { User, usuarios, usuarioSchema } from '../../usuarios';

// HOISTING
function getUser () {
    return usuarios;
}
function getUserID (id: number): usuarioSchema | undefined {
    console.log('tipo do id = ', typeof id);
    return usuarios.find(user => user.id === id);
}


// CREATE
function criaUsuario(usuario: User): usuarioSchema[] {
    usuarios.push(
        {...usuario}
    );
    return usuarios;
}


// UPDATE
function updateUser(id:number, dadosAtualizados: usuarioSchema): usuarioSchema | undefined {
    const indiceUsuario = usuarios.findIndex(user => user.id === id);

    if(indiceUsuario === -1) {
        console.log(`Usuário de ID: ${id} não encontrado`);
        return;
    }

    // Atualiza os dados do usuário escolhido com apenas os campos informados
    usuarios[indiceUsuario] = {
        ...usuarios[indiceUsuario],
        ...dadosAtualizados
    };

    return usuarios[indiceUsuario];
}


// DELETE
function deleteUser(id: number): usuarioSchema | undefined {
    const indiceUsuario = usuarios.findIndex(user => user.id === id);

    if(indiceUsuario === -1) {
        console.log(`Usuário de ID: ${id} não encontrado`);
        return;
    }

    // Remove o usuário escolhido e retorna o usuário removido
    const usuarioRemovido = usuarios.splice(indiceUsuario, 1)[0];
    return usuarioRemovido;
}
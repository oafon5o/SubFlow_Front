import api from "./api";

export interface Usuario{
    id: number,
    nome: string,
    cpf: string,
    email: string
}

export async function buscarTodosUsuarios() : Promise<Usuario[]>{
    const response = await api.get<Usuario[]>("/usuarios");
    return response.data;
}
import api from "./api";

export interface LoginRequestDto {
    email: string,
    senha: string
}

export interface LoginResponseDto {
    token: string
}

// DTO para a primeira etapa: envio do email
export interface EsqueciMinhaSenhaRequestDto  {
    email: string;
};

// DTO para a segunda etapa: redefinição de senha
export interface RedefinirSenhaRequestDto {
    codigo: string;
    novaSenha: string;
    confirmacaoSenha: string;
};

export async function LoginNovo(loginRequestDto : LoginRequestDto) : Promise<LoginResponseDto>{
    const response = await api.post<LoginResponseDto>("auth/login", loginRequestDto);
    return response.data;
}

export async function EsqueciMinhaSenha(esqueciMinhaSenhaDto : EsqueciMinhaSenhaRequestDto) : Promise<boolean>{
     await api.post("auth/esqueciminhasenha", esqueciMinhaSenhaDto);
    return true;
}

export async function RedefinirSenha(RedefinirSenhaDto : RedefinirSenhaRequestDto) : Promise<boolean>{
     await api.post("auth/recuperarSenha", RedefinirSenhaDto);
    return true;
}


// const login = async (loginRequestDto : LoginRequestDto): Promise<LoginResponseDto> =>{
//     const response = await api.post<LoginResponseDto>("auth/login", loginRequestDto);
//     return response.data;
// }

// const authService ={
//     login
// }

// export default authService;
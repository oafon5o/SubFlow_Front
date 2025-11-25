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
    email: string;
    codigo: string;
    novaSenha: string;
    confirmacaoSenha: string;
};

export interface RegistrarNovaSenhaBackendDto {
    senha: string;
    token: string;
    email: string;
}

export interface RegistrarServicoRequestDto {
    nomeServico: string;
    dataInicio: string; // Formato YYYY-MM-DD
    duracaoMeses: number; // Número de meses da assinatura
}

export interface AssinaturaAcaoDto {
    acao: 'CANCELAR' | 'RENOVAR';
}

export interface AssinaturaListDto {
    id: number;
    nomeServico: string;
    status: 'ATIVA' | 'VENCIDA' | 'CANCELADA';
    dataVencimento: string;
}

export interface AssinaturaResponseDto {
    id: number;
    nomeServico: string;
    dataInicio: string; 
    duracaoMeses: number;
    dataVencimento: string;
    status: 'ATIVA' | 'VENCIDA' | 'CANCELADA';
}

export async function LoginNovo(loginRequestDto : LoginRequestDto) : Promise<LoginResponseDto>{
    const response = await api.post<LoginResponseDto>("auth/login", loginRequestDto);
    return response.data;
}

export async function EsqueciMinhaSenha(esqueciMinhaSenhaDto : EsqueciMinhaSenhaRequestDto) : Promise<boolean>{
     await api.post("auth/esqueciminhasenha", esqueciMinhaSenhaDto);
    return true;
}

export async function RedefinirSenha(RedefinirSenhaDto : RedefinirSenhaRequestDto) : Promise<boolean>{
    
    const payloadParaBackend: RegistrarNovaSenhaBackendDto = {
        email: RedefinirSenhaDto.email,
        token: RedefinirSenhaDto.codigo,
        senha: RedefinirSenhaDto.novaSenha
    };
    
    await api.post("auth/registrarnovasenha", payloadParaBackend);
    return true;
}

export async function registrarNovaAssinatura(dadosServico: RegistrarServicoRequestDto): Promise<void> {
    // Endpoint: POST /assinaturas
    await api.post("assinaturas", dadosServico);
}

export async function buscarAssinaturasFiltradas(
    take: number = 10, 
    page: number = 0, 
    filtro: string = ''
): Promise<AssinaturaListDto[]> {
    // 🔒 ATENÇÃO: Assumindo que o controller está mapeado em "/api/assinaturas"
    const response = await api.get<AssinaturaListDto[]>(`assinaturas/grid?take=${take}&page=${page}&filtro=${filtro}`);
    return response.data;
}

export async function buscarDetalhesAssinatura(id: string): Promise<AssinaturaResponseDto> {
    // 🔒 ATENÇÃO: Seu backend tem o endpoint: GET /minhaAssinatura. Como ele não aceita ID na URL, 
    // ele deve retornar a ÚLTIMA assinatura do usuário logado.
    // Para simplificar a demonstração da lista (que usa IDs), vamos assumir que o backend tem um endpoint por ID:
    const response = await api.get<AssinaturaResponseDto>(`assinaturas/${id}`);
    return response.data;
}

export async function realizarAcaoAssinatura(id: number, acao: 'CANCELAR' | 'RENOVAR'): Promise<void> {
    const payload: AssinaturaAcaoDto = { acao };
    // O endpoint do backend é: PUT /{id}/acao
    await api.put(`assinaturas/${id}/acao`, payload); 
}


// const login = async (loginRequestDto : LoginRequestDto): Promise<LoginResponseDto> =>{
//     const response = await api.post<LoginResponseDto>("auth/login", loginRequestDto);
//     return response.data;
// }

// const authService ={
//     login
// }

// export default authService;
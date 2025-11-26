import api from "./api";

export interface LoginRequestDto {
    email: string,
    senha: string
}

export interface LoginResponseDto {
    token: string,
    id: number,
    role: string
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

// DTO para registro de nova senha e validação do código enviado via e-mail
export interface RegistrarNovaSenhaBackendDto {
    senha: string;
    token: string;
    email: string;
}

// DTO para registro de serviço
export interface RegistrarServicoRequestDto {
    nomeServico: string;
    dataInicio: string;
    duracaoMeses: number;
}

// DTO para registro de usuário novo no cadastre-se
export interface CadastroRequestDto {
    nome: string;
    email: string;
    senha: string;
    role: string;
}

export interface UsuarioAtualizarRequestDto {
    nome: string;
    cpf: string;
    email: string;
    role?: string;
}

export interface UsuarioDetalhesResponseDto {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    role: string;
}

// DTO para ações que podem ser feitas na assinatura
export interface AssinaturaAcaoDto {
    acao: 'CANCELAR' | 'RENOVAR';
}

// DTO para alteração de status da assinatura
export interface AssinaturaListDto {
    id: number;
    nomeServico: string;
    status: 'ATIVA' | 'VENCIDA' | 'CANCELADA';
    dataVencimento: string;
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
    await api.post("assinaturas", dadosServico);
}

export async function registrarNovoUsuario(dadosCadastro: CadastroRequestDto): Promise<void> {
    await api.post("usuarios", dadosCadastro);
}

export async function buscarAssinaturasFiltradas(
    take: number = 10, 
    page: number = 0, 
    filtro: string = ''
): Promise<AssinaturaListDto[]> {
    const response = await api.get<AssinaturaListDto[]>(`assinaturas/grid?take=${take}&page=${page}&filtro=${filtro}`);
    return response.data;
}

export async function realizarAcaoAssinatura(id: number, acao: 'CANCELAR' | 'RENOVAR'): Promise<void> {
    const payload: AssinaturaAcaoDto = { acao };
    await api.put(`assinaturas/${id}/acao`, payload); 
}

export async function buscarDetalhesUsuario(id: string | number): Promise<UsuarioDetalhesResponseDto> {
    const response = await api.get<UsuarioDetalhesResponseDto>(`usuarios/${id}`);
    return response.data;
}

export async function alterarDadosUsuario(id: number, dadosAtualizados: UsuarioAtualizarRequestDto): Promise<void> {
    await api.put(`usuarios/${id}`, dadosAtualizados); 
}

export async function buscarTodosUsuarios(): Promise<UsuarioDetalhesResponseDto[]> {
    const response = await api.get<UsuarioDetalhesResponseDto[]>("usuarios"); 
    return response.data;
}

export async function removerUsuario(id: number): Promise<void> {
    await api.delete(`usuarios/${id}`); 
}


// const login = async (loginRequestDto : LoginRequestDto): Promise<LoginResponseDto> =>{
//     const response = await api.post<LoginResponseDto>("auth/login", loginRequestDto);
//     return response.data;
// }

// const authService ={
//     login
// }

// export default authService;
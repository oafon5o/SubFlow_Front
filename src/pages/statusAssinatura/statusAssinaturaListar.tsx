import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarAssinaturasFiltradas, realizarAcaoAssinatura, type AssinaturaListDto } from '../../services/authService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

// ⚠️ Este componente usa o Font Awesome para o ícone de menu de ações.
// Certifique-se de ter a biblioteca Font Awesome instalada no seu projeto (npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons)
function StatusAssinaturaListar() {
    const navigate = useNavigate();
    const [assinaturas, setAssinaturas] = useState<AssinaturaListDto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    
    // Configurações para a paginação (conforme seu endpoint /grid)
    const take = 10; 
    const page = 0; // Para simplificar, vamos fixar na primeira página por enquanto

    // ----------------------------------------------------
    // Carregamento e Filtro de Dados (Usando o Grid do Backend)
    // ----------------------------------------------------

    const carregarAssinaturas = async (currentFiltro = searchTerm) => {
        setLoading(true);
        try {
            // Chama a função do service com filtro (e os parâmetros de paginação fixos)
            const lista = await buscarAssinaturasFiltradas(take, page, currentFiltro);
            setAssinaturas(lista);
            
        } catch (error) {
            console.error("Erro ao carregar assinaturas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Carrega os dados na montagem inicial
        carregarAssinaturas(); 
    }, []);

    // Efeito para Pesquisa: Recarrega a lista toda vez que o termo de busca muda
    useEffect(() => {
        // Para melhor performance, a pesquisa é delegada ao backend usando o termo atual
        // ⚠️ Nota: Um pequeno delay (debounce) seria ideal aqui para evitar muitas chamadas ao backend.
        carregarAssinaturas(searchTerm);
    }, [searchTerm]);

    // ----------------------------------------------------
    // Funções de Ação
    // ----------------------------------------------------

    const handleRenovar = async (id: number) => {
        // Não usar window.confirm() em produção, usar modal customizado
        if (window.confirm("Tem certeza que deseja renovar esta assinatura?")) {
            try {
                await realizarAcaoAssinatura(id, 'RENOVAR');
                alert("Assinatura renovada com sucesso!"); 
                carregarAssinaturas(); // Recarrega a lista
            } catch (error) {
                alert("Erro ao renovar a assinatura."); 
            }
        }
    };

    const handleCancelar = async (id: number) => {
        // Não usar window.confirm() em produção, usar modal customizado
        if (window.confirm("Tem certeza que deseja CANCELAR esta assinatura?")) {
            try {
                await realizarAcaoAssinatura(id, 'CANCELAR');
                alert("Assinatura cancelada com sucesso!"); 
                carregarAssinaturas(); // Recarrega a lista
            } catch (error) {
                alert("Erro ao cancelar a assinatura."); 
            }
        }
    };

    const handleVisualizar = (id: string) => {
        // Redireciona para a página de visualização de detalhes (StatusAssinaturaDetalhes.tsx)
        navigate(`/statusAssinatura/${id}`); 
    };
    
    // Função para direcionar para a tela de criação
    const handleCriarAssinatura = () => {
        navigate('/registroServico');
    };

    // ----------------------------------------------------
    // Componente de Renderização do Status Visual
    // ----------------------------------------------------

    const getStatusBadge = (status: AssinaturaListDto['status']) => {
        let className = 'badge fs-6 ';
        switch (status) {
            case 'ATIVA':
                className += 'bg-success';
                break;
            case 'VENCIDA':
                className += 'bg-warning text-dark';
                break;
            case 'CANCELADA':
                className += 'bg-danger';
                break;
            default:
                className += 'bg-secondary';
        }
        return <span className={className}>{status}</span>;
    };
    
    if (loading) return <div className="text-center mt-5">Carregando assinaturas...</div>;
    if (assinaturas.length === 0 && !searchTerm) return <div className="text-center mt-5 alert alert-info">Nenhuma assinatura registrada.</div>;
    if (assinaturas.length === 0 && searchTerm) return <div className="text-center mt-5 alert alert-warning">Nenhum resultado encontrado para "{searchTerm}".</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Minhas Assinaturas</h2>
            
            {/* Input de Pesquisa e Botão Criar */}
            <div className="d-flex justify-content-between mb-4">
                <input 
                    type="text"
                    className="form-control me-3"
                    placeholder="Pesquisar por nome do serviço..."
                    style={{ maxWidth: '400px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleCriarAssinatura}>
                    + Criar assinatura
                </button>
            </div>
            
            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>Serviço</th>
                        <th>Status</th>
                        <th>Vencimento</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {assinaturas.map((assinatura) => (
                        <tr key={assinatura.id}>
                            <td>{assinatura.nomeServico}</td>
                            <td>{getStatusBadge(assinatura.status)}</td>
                            <td>{assinatura.dataVencimento}</td>
                            <td className="text-center">
                                {/* Menu Dropdown com os Três Pontinhos */}
                                <div className="dropdown">
                                    <button 
                                        className="btn btn-secondary btn-sm dropdown-toggle" 
                                        type="button" 
                                        id={`dropdownMenu-${assinatura.id}`} 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        {/* Ícone de três pontinhos (Font Awesome) */}
                                        <FontAwesomeIcon icon={faEllipsisV} /> 
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${assinatura.id}`}>
                                        <li>
                                            <button className="dropdown-item" onClick={() => handleVisualizar(assinatura.id.toString())}>
                                                Visualizar
                                            </button>
                                        </li>
                                        {/* Opção Renovar só aparece se o status for VENCIDA */}
                                        {assinatura.status === 'VENCIDA' && (
                                            <li>
                                                <button className="dropdown-item" onClick={() => handleRenovar(assinatura.id)}>
                                                    Renovar
                                                </button>
                                            </li>
                                        )}
                                        <li>
                                            <button 
                                                className="dropdown-item text-danger" 
                                                onClick={() => handleCancelar(assinatura.id)}
                                            >
                                                Cancelar
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StatusAssinaturaListar;
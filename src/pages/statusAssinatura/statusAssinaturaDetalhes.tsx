import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { buscarDetalhesAssinatura, realizarAcaoAssinatura, type AssinaturaResponseDto } from '../../services/authService';

function StatusAssinaturaDetalhes() {
    // Captura o ID da URL, que é usado para buscar os detalhes
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const [assinatura, setAssinatura] = useState<AssinaturaResponseDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const carregarDetalhes = async () => {
                setLoading(true);
                try {
                    // Busca os detalhes da assinatura pelo ID
                    const data = await buscarDetalhesAssinatura(id); 
                    setAssinatura(data);
                } catch (error) {
                    console.error("Erro ao carregar detalhes:", error);
                    setAssinatura(null);
                } finally {
                    setLoading(false);
                }
            };
            carregarDetalhes();
        }
    }, [id]);

    const handleRenovar = async () => {
        if (!assinatura) return;

        if (window.confirm(`Você tem certeza que deseja RENOVAR a assinatura "${assinatura.nomeServico}"?`)) {
            try {
                // Chama a ação de renovar (PUT /{id}/acao com payload RENOVAR)
                await realizarAcaoAssinatura(assinatura.id, 'RENOVAR');
                alert("Assinatura renovada com sucesso! Recarregando...");
                // Após renovar, recarrega a página para atualizar o status
                // navigate(0) força a recarga do componente
                navigate(0); 
            } catch (error) {
                alert("Erro ao renovar a assinatura. Tente novamente.");
            }
        }
    };
    
    // Helper para exibir o status em cores
    const getStatusColor = (status: AssinaturaResponseDto['status']) => {
        switch (status) {
            case 'ATIVA': return 'text-success';
            case 'VENCIDA': return 'text-warning';
            case 'CANCELADA': return 'text-danger';
            default: return 'text-secondary';
        }
    };
    
    if (loading) return <div className="text-center mt-5">Carregando detalhes...</div>;
    if (!assinatura) return <div className="text-center mt-5 alert alert-danger">Detalhes da assinatura não encontrados.</div>;

    const isVencida = assinatura.status === 'VENCIDA';

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Detalhes da Assinatura: {assinatura.nomeServico}</h3>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-6"><strong>ID da Assinatura:</strong></div>
                        <div className="col-md-6">{assinatura.id}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6"><strong>Serviço:</strong></div>
                        <div className="col-md-6">{assinatura.nomeServico}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6"><strong>Data de Início:</strong></div>
                        <div className="col-md-6">{assinatura.dataInicio}</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6"><strong>Duração (Meses):</strong></div>
                        <div className="col-md-6">{assinatura.duracaoMeses} meses</div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6"><strong>Data de Vencimento:</strong></div>
                        <div className="col-md-6">{assinatura.dataVencimento}</div>
                    </div>
                    <hr/>
                    <div className="row mb-4">
                        <div className="col-md-6"><strong>Status Atual:</strong></div>
                        <div className={`col-md-6 fs-5 fw-bold ${getStatusColor(assinatura.status)}`}>
                            {assinatura.status}
                        </div>
                    </div>

                    {/* Botão Renovar se o status for VENCIDA */}
                    {isVencida && (
                        <div className="text-center mt-4">
                            <button className="btn btn-success btn-lg" onClick={handleRenovar}>
                                RENOVAR ASSINATURA
                            </button>
                            <p className="mt-2 text-warning">Sua assinatura está vencida. Clique em Renovar para reativar o serviço.</p>
                        </div>
                    )}
                    {assinatura.status === 'CANCELADA' && (
                        <div className="text-center mt-4">
                            <p className="mt-2 text-danger">Esta assinatura foi cancelada e não pode ser renovada.</p>
                        </div>
                    )}
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-secondary" onClick={() => navigate('/statusAssinatura')}>
                        Voltar para a Lista
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StatusAssinaturaDetalhes;
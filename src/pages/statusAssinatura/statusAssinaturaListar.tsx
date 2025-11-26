import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { logActivity } from '../../redux/recentesSlice';
import { buscarAssinaturasFiltradas, realizarAcaoAssinatura, type AssinaturaListDto } from '../../services/authService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faHistory } from '@fortawesome/free-solid-svg-icons';

function StatusAssinaturaListar() {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const [assinaturas, setAssinaturas] = useState<AssinaturaListDto[]>([]);
    const [displayedSearchTerm, setDisplayedSearchTerm] = useState(''); 
    const [apiSearchTerm, setApiSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    
    const take = 10; 
    const page = 0; 

    const carregarAssinaturas = async (filtro: string = '') => {
        setLoading(true);
        try {
            const lista = await buscarAssinaturasFiltradas(take, page, filtro);
            setAssinaturas(lista);
        } catch (error) {
            console.error("Erro ao carregar assinaturas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setApiSearchTerm(displayedSearchTerm);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [displayedSearchTerm]);

    useEffect(() => {
        carregarAssinaturas(apiSearchTerm);
        
        dispatch(logActivity({
            type: 'VISUALIZACAO',
            details: `Visualizou o Painel de Assinaturas (Filtro: ${apiSearchTerm || 'Nenhum'}).`,
        }));
        
    }, [apiSearchTerm, dispatch]);

    const handleRenovar = async (id: number, nomeServico: string) => { 
        if (window.confirm(`Tem certeza que deseja renovar a assinatura ${nomeServico}?`)) {
            try {
                await realizarAcaoAssinatura(id, 'RENOVAR');
                alert(`Assinatura ${nomeServico} renovada com sucesso!`); 
                carregarAssinaturas(apiSearchTerm);
                
                dispatch(logActivity({
                    type: 'RENOVACAO',
                    details: `Renovou a assinatura: ${nomeServico}.`,
                }));

            } catch (error) {
                alert("Erro ao renovar a assinatura."); 
            }
        }
    };

    const handleCancelar = async (id: number, nomeServico: string) => { 
        if (window.confirm(`Tem certeza que deseja CANCELAR a assinatura ${nomeServico}?`)) {
            try {
                await realizarAcaoAssinatura(id, 'CANCELAR');
                alert(`Assinatura ${nomeServico} cancelada com sucesso!`); 
                carregarAssinaturas(apiSearchTerm);
                
                dispatch(logActivity({
                    type: 'CANCELAMENTO',
                    details: `Cancelou a assinatura: ${nomeServico}.`,
                }));

            } catch (error) {
                alert("Erro ao cancelar a assinatura."); 
            }
        }
    };

    const handleVisualizar = (id: string, nomeServico: string) => { 
        dispatch(logActivity({
            type: 'VISUALIZACAO',
            details: `Visualizou detalhes da assinatura: ${nomeServico}.`,
        }));

        navigate(`/statusAssinatura/${id}`); 
    };
    
    const handleCriarAssinatura = () => {
        navigate('/registroServico');
    };

    const handleVerRecentes = () => {
        navigate('/recentesAssinatura'); 
    };

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

    let content;

    if (loading) {
        content = <div className="text-center mt-5">Carregando assinaturas...</div>;
    } else if (assinaturas.length === 0 && !apiSearchTerm) {
        content = <div className="text-center mt-5 alert alert-info">Nenhuma assinatura registrada.</div>;
    } else if (assinaturas.length === 0 && apiSearchTerm) {
        content = <div className="text-center mt-5 alert alert-warning">Nenhum resultado encontrado para "{apiSearchTerm}".</div>;
    } else {
        content = (
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
                                <div className="dropdown">
                                    <button 
                                        className="btn btn-secondary btn-sm dropdown-toggle" 
                                        type="button" 
                                        id={`dropdownMenu-${assinatura.id}`} 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        <FontAwesomeIcon icon={faEllipsisV} /> 
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${assinatura.id}`}>
                                        <li>
                                            <button className="dropdown-item" onClick={() => handleVisualizar(assinatura.id.toString(), assinatura.nomeServico)}>
                                                Visualizar
                                            </button>
                                        </li>
                                        {assinatura.status === 'VENCIDA' && (
                                            <li>
                                                <button className="dropdown-item" onClick={() => handleRenovar(assinatura.id, assinatura.nomeServico)}>
                                                    Renovar
                                                </button>
                                            </li>
                                        )}
                                        <li>
                                            <button 
                                                className="dropdown-item text-danger" 
                                                onClick={() => handleCancelar(assinatura.id, assinatura.nomeServico)}
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
        );
    }

    return (
        <div className="container mt-4">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Minhas Assinaturas</h2>
                
                <button className="btn btn-outline-info" onClick={handleVerRecentes}>
                    <FontAwesomeIcon icon={faHistory} className="me-2" />
                    Ver Recentes
                </button>
            </div>
            
            <div className="d-flex justify-content-between mb-4">
                <input 
                    type="text"
                    className="form-control me-3"
                    placeholder="Pesquisar por nome do serviço..."
                    style={{ maxWidth: '400px' }}
                    value={displayedSearchTerm} 
                    onChange={(e) => setDisplayedSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleCriarAssinatura}>
                    + Registrar novo serviço
                </button>
            </div>
            
            {content}
        </div>
    );
}

export default StatusAssinaturaListar;
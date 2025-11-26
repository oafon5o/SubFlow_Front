import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../redux/store';
import { clearActivities, logActivity } from '../../redux/recentesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faHistory, faEye, faEdit, faRedo, faBan } from '@fortawesome/free-solid-svg-icons';

const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'medium',
    });
}

function RecentesAssinatura() {
    const atividades = useSelector((state: RootState) => state.recentes.atividades);
    const dispatch = useDispatch();

    const handleClear = () => {
        if (window.confirm("Tem certeza que deseja limpar o histórico recente desta sessão?")) {
            dispatch(clearActivities());
        }
    };

    const getActivityStyle = (type: string) => {
        switch (type) {
            case 'VISUALIZACAO': 
                return { color: 'text-info', icon: faEye };
            case 'EDICAO': 
                return { color: 'text-warning', icon: faEdit };
            case 'RENOVACAO': 
                return { color: 'text-success', icon: faRedo };
            case 'CANCELAMENTO': 
                return { color: 'text-danger', icon: faBan };
            default: 
                return { color: 'text-secondary', icon: faHistory };
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 className="text-3xl font-bold text-primary">Atividades Recentes de Assinatura</h2>
                
                <button 
                    onClick={handleClear} 
                    className="btn btn-sm btn-outline-danger"
                    disabled={atividades.length === 0}
                >
                    <FontAwesomeIcon icon={faTrash} className="me-2" />
                    Limpar Recentes ({atividades.length})
                </button>
            </div>
            
            {atividades.length === 0 ? (
                <div className="text-center py-5 alert alert-info">
                    Nenhuma atividade recente registrada nesta sessão.
                </div>
            ) : (
                <ul className="list-unstyled space-y-3">
                    {atividades.map((activity, index) => {
                        const style = getActivityStyle(activity.type);
                        return (
                            <li 
                                key={activity.id} 
                                className="p-3 bg-light rounded-lg border-start border-3 d-flex justify-content-between align-items-center shadow-sm"
                                style={{ borderColor: style.color.replace('text-', '') }} // Usa a cor do Bootstrap
                            >
                                <div className="d-flex align-items-center">
                                    <FontAwesomeIcon icon={style.icon} className={`me-3 ${style.color}`} size="lg" />
                                    <div>
                                        <p className="mb-0 font-weight-bold text-gray-800">
                                            {activity.details}
                                        </p>
                                        <p className="mb-0 text-sm text-muted mt-1">
                                            Tipo: <span className={`font-semibold ${style.color}`}>
                                                {activity.type}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <time className="text-sm text-gray-400 flex-shrink-0">
                                    {formatTimestamp(activity.timestamp)}
                                </time>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default RecentesAssinatura;
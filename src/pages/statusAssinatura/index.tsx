import React from 'react';

const StatusAssinatura: React.FC = () => {
    const status = "ATIVO"; 
    const isStatusActive = status === "ATIVO";

    return (
        <div className="container mt-5 text-center">
            <div className="card shadow-sm p-5 border-0">
                <div className="card-body">
                    <h1 className="card-title display-5 fw-bold mb-3">
                        Status de sua Assinatura
                    </h1>
                    <p className="card-text fs-5 text-muted mb-4">
                        Aqui você pode verificar o status do seu serviço de streaming.
                    </p>
                    <hr className="my-4" />
                    
                    <div className="mt-4">
                        <p className="fs-4 fw-bold">Seu serviço está:</p>
                        <span className={`badge ${isStatusActive ? 'bg-success' : 'bg-secondary'} fs-3`}>
                            {status}
                        </span>
                    </div>
                    
                    {isStatusActive && (
                        <p className="mt-4 fs-6 text-success">
                            Sua assinatura está ativa! Aproveite seu serviço sem preocupações.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatusAssinatura;
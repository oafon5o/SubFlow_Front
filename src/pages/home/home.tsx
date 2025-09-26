import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="container mt-5 text-center">
            <div className="card shadow-sm p-5 border-0">
                <div className="card-body">
                    <h1 className="card-title display-4 fw-bold mb-3">Bem-vindo ao SubFlow</h1>
                    <p className="card-text fs-5 text-muted">
                        Seu gerenciador pessoal de assinaturas de streaming.
                    </p>
                    <p className="card-text fs-6 mt-4">
                        Com o SubFlow, você pode facilmente registrar seus serviços e acompanhar o status de suas assinaturas, sabendo se estão ativas, vencidas ou canceladas.
                    </p>
                    <hr className="my-4" />
                    <p className="card-text">
                        Use o menu lateral para começar a gerenciar seus serviços.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
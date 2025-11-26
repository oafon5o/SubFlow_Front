import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    buscarDetalhesUsuario,
    type UsuarioDetalhesResponseDto 
} from '../../services/authService';

function VisualizarPerfil() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    
    const [perfil, setPerfil] = useState<UsuarioDetalhesResponseDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userIdToLoad = id; 
        
        if (!userIdToLoad || userIdToLoad === '0') {
             setLoading(false);
             return; 
        }

        const carregarDetalhes = async () => {
            setLoading(true);
            try {
                const data: UsuarioDetalhesResponseDto = await buscarDetalhesUsuario(userIdToLoad);
                setPerfil(data);
            } catch (error) {
                console.error("Erro ao carregar dados do perfil:", error);
                alert("Erro ao carregar dados do perfil. Verifique permissão ou ID.");
                navigate('/home'); 
            } finally {
                setLoading(false);
            }
        };
        carregarDetalhes();
        
    }, [id, navigate]);

    if (loading) return <div className="text-center mt-5">Carregando dados do perfil...</div>;
    
    if (!perfil) return <div className="text-center mt-5 alert alert-warning">Perfil não encontrado ou acesso inválido.</div>;
    
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Meu Perfil (Visualização)</h2>
            
            <div className="card p-5 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h4 className="mb-4 card-title text-primary">Informações Pessoais</h4>
                
                <div className="row mb-3">
                    <div className="col-md-4 text-muted"><strong>ID:</strong></div>
                    <div className="col-md-8">{perfil.id}</div>
                </div>
                
                <div className="row mb-3">
                    <div className="col-md-4 text-muted"><strong>Nome:</strong></div>
                    <div className="col-md-8">{perfil.nome}</div>
                </div>
                
                <div className="row mb-3">
                    <div className="col-md-4 text-muted"><strong>Email:</strong></div>
                    <div className="col-md-8">{perfil.email}</div>
                </div>
                
                <div className="row mb-3">
                    <div className="col-md-4 text-muted"><strong>CPF:</strong></div>
                    <div className="col-md-8">{perfil.cpf}</div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4 text-muted"><strong>Nível:</strong></div>
                    <div className="col-md-8">
                        <span className={`badge ${perfil.role === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
                            {perfil.role}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarPerfil;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {
    buscarTodosUsuarios,
    removerUsuario,
    type UsuarioDetalhesResponseDto
} from '../../services/authService';

function UsuarioListar() {
    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<UsuarioDetalhesResponseDto[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [hasPermissionError, setHasPermissionError] = useState(false);

    const carregarUsuarios = async () => {
        setLoading(true);
        setHasPermissionError(false);
        try {
            const lista = await buscarTodosUsuarios();
            setUsuarios(lista);

        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
            setUsuarios([]);
            setHasPermissionError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarUsuarios();
    }, []);

    const usuariosFiltrados = usuarios.filter(u =>
        u.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditar = (id: number) => {
        navigate(`/alterarUsuario/${id}`);
    };

    const handleRemover = async (id: number) => {
        if (window.confirm(`Tem certeza que deseja remover o usuário com ID ${id}? Esta ação é irreversível!`)) {
            try {
                await removerUsuario(id);
                alert("Usuário removido com sucesso!");
                carregarUsuarios();
            } catch (error) {
                console.error("Erro ao remover usuário:", error);
                alert("Erro ao remover usuário. Verifique o console.");
            }
        }
    };

    if (loading) return <div className="text-center mt-5">Carregando painel de usuários...</div>;

    if (hasPermissionError) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center shadow-lg p-5">
                    <h4 className="alert-heading">Acesso Negado!</h4>
                    <p>Você não possui permissão (ROLE_ADMIN) para visualizar o Painel de Usuários.</p>
                    <hr />
                    <button className="btn btn-danger" onClick={() => navigate('/home')}>Voltar para a Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Painel de Usuários (Acesso Admin)</h2>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar por Nome ou E-mail..."
                    style={{ maxWidth: '400px' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Role</th>
                        <th className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.cpf}</td>
                            <td>
                                <span className={`badge ${usuario.role === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
                                    {usuario.role}
                                </span>
                            </td>
                            <td className="text-center">
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary btn-sm dropdown-toggle"
                                        type="button"
                                        id={`dropdownMenu-${usuario.id}`}
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby={`dropdownMenu-${usuario.id}`}>
                                        <li>
                                            <button className="dropdown-item" onClick={() => handleEditar(usuario.id)}>
                                                Editar
                                            </button>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <button
                                                className="dropdown-item text-danger"
                                                onClick={() => handleRemover(usuario.id)}
                                            >
                                                Remover
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(usuariosFiltrados.length === 0 && !loading) && <div className="text-center mt-5 alert alert-warning">Nenhum usuário encontrado.</div>}
        </div>
    );
}

export default UsuarioListar;
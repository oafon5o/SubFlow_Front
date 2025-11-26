import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    buscarDetalhesUsuario,
    alterarDadosUsuario,
    type UsuarioDetalhesResponseDto,
    type UsuarioAtualizarRequestDto
} from '../../services/authService';

interface FormState extends UsuarioAtualizarRequestDto {
    id: number;
}

function UsuarioAlteracaoPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const isLoggedUserAdmin = true;

    const [formData, setFormData] = useState<FormState | null>(null);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const userIdToLoad = id;

        if (userIdToLoad) {
            const carregarDetalhes = async () => {
                setLoading(true);
                try {
                    const data: UsuarioDetalhesResponseDto = await buscarDetalhesUsuario(userIdToLoad);

                    setFormData({
                        id: data.id,
                        nome: data.nome,
                        cpf: data.cpf,
                        email: data.email,
                        role: data.role
                    });
                } catch (error) {
                    console.error("Erro ao carregar dados do usuário:", error);
                    alert("Erro ao carregar dados do usuário. Verifique o ID.");
                    navigate('/home');
                } finally {
                    setLoading(false);
                }
            };
            carregarDetalhes();
        }
    }, [id, navigate]);

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState!,
            [name]: value,
        }));
    };

    const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSuccessMessage(null);

        if (!formData) return;

        const dadosParaBackend: UsuarioAtualizarRequestDto = {
            nome: formData.nome,
            cpf: formData.cpf,
            email: formData.email,
            role: formData.role
        };

        try {
            await alterarDadosUsuario(formData.id, dadosParaBackend);
            setSuccessMessage("Dados do usuário alterados com sucesso!");

            setTimeout(() => {
                navigate('/home');
            }, 1500);

        } catch (error) {
            console.error("Erro ao alterar dados:", error);
            setSuccessMessage("Erro: Não foi possível alterar os dados. Verifique permissões ou dados.");
        }
    };

    if (loading) return <div className="text-center mt-5">Carregando dados do usuário...</div>;
    if (!formData) return null;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Alterar Dados do Usuário (ID: {formData.id})</h2>

            {successMessage && (
                <div className={`alert ${successMessage.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handlerSubmit} className="card p-4 shadow-sm">

                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" name="nome" className="form-control" id="nome" value={formData.nome} onChange={handlerChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" id="email" value={formData.email} onChange={handlerChange} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input type="text" name="cpf" className="form-control" id="cpf" value={formData.cpf} onChange={handlerChange} required />
                </div>

                {isLoggedUserAdmin && (
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Nível de Acesso (ROLE)</label>
                        <select name="role" id="role" className="form-control" value={formData.role} onChange={handlerChange} required>
                            <option value="ROLE_ASSINANTE">ROLE_ASSINANTE</option>
                            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                        </select>
                    </div>
                )}

                <button type="submit" className="btn btn-primary mt-3">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default UsuarioAlteracaoPage;
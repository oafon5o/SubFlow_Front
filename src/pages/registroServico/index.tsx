import React, { useState } from 'react';
import { registrarNovaAssinatura, type RegistrarServicoRequestDto } from '../../services/authService';

// Estado inicial do formulário, refletindo o DTO de requisição
const initialState: RegistrarServicoRequestDto = {
    nomeServico: '',
    dataInicio: '', // Espera o formato YYYY-MM-DD
    duracaoMeses: 1
};

const RegistroServico: React.FC = () => {
    const [formData, setFormData] = useState<RegistrarServicoRequestDto>(initialState);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Função genérica para lidar com a mudança nos inputs
    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        
        // Converte para número se for o campo duracaoMeses
        const finalValue = type === 'number' ? Number(value) : value;

        setFormData(prevState => ({
            ...prevState,
            [name]: finalValue,
        }));
    };

    // Função para lidar com o envio do serviço
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null); // Limpa mensagens anteriores

        // Validação simples da duração
        if (formData.duracaoMeses <= 0) {
            setSuccessMessage("A duração em meses deve ser no mínimo 1.");
            return;
        }

        try {
            // 🎯 Requisição POST para o endpoint de criação de serviço via Service
            await registrarNovaAssinatura(formData);

            console.log("Serviço registrado com sucesso:", formData);
            setSuccessMessage("Serviço registrado com sucesso! Você já pode visualizá-lo na lista.");
            setFormData(initialState); // Limpa o formulário após o sucesso

        } catch (error) {
            console.error("Erro ao registrar o serviço:", error);
            // 🔒 Em um app real, você verificaria o status do erro (ex: 400 Bad Request)
            setSuccessMessage("Erro ao registrar o serviço. Verifique os dados e tente novamente.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Registro de Novo Serviço</h2>

            {/* Alerta de sucesso/erro */}
            {successMessage && (
                <div className={`alert ${successMessage.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* 1. Nome do Serviço */}
                <div className="mb-3">
                    <label htmlFor="nomeServico" className="form-label">Nome do Serviço</label>
                    <input
                        type="text"
                        name="nomeServico" // 🔒 Deve ser igual ao campo do DTO
                        className="form-control"
                        id="nomeServico"
                        placeholder="Ex: Netflix, Spotify"
                        value={formData.nomeServico}
                        onChange={handlerChange}
                        required
                    />
                </div>
                
                {/* 2. Data de Início */}
                <div className="mb-3">
                    <label htmlFor="dataInicio" className="form-label">Data de Início</label>
                    <input
                        type="date"
                        name="dataInicio" // 🔒 Deve ser igual ao campo do DTO
                        className="form-control"
                        id="dataInicio"
                        value={formData.dataInicio}
                        onChange={handlerChange}
                        required
                    />
                </div>

                {/* 3. Duração em Meses */}
                <div className="mb-3">
                    <label htmlFor="duracaoMeses" className="form-label">Duração (em Meses)</label>
                    <input
                        type="number"
                        name="duracaoMeses" // 🔒 Deve ser igual ao campo do DTO
                        className="form-control"
                        id="duracaoMeses"
                        min="1"
                        value={formData.duracaoMeses}
                        onChange={handlerChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Salvar Serviço</button>
            </form>
        </div>
    );
};

export default RegistroServico;
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8080/";

const RegistroServico: React.FC = () => {
    //usuario insere nome do servico
    const [serviceName, setServiceName] = useState<string>('');
    //mensagem de aviso
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    //funcao para lidar com envio do servico
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const serviceData = {
            nomeServico: serviceName,
            dataVencimento: new Date()
        };

        try {
            // Requisição POST para o endpoint de criação de servico
            const response = await axios.post(API_URL + "assinaturas", serviceData);

            if (response.status === 200) {
                console.log("Serviço registrado com sucesso:", response.data);
                setSuccessMessage("Serviço registrado com sucesso!");
                setServiceName('');
            }

        } catch (error) {
            console.error("Erro ao registrar o serviço:", error);
            setSuccessMessage("Erro ao registrar o serviço. Tente novamente.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Registro de Serviço</h2>

            {/* Alerta de sucesso */}
            {successMessage && (
                <div className={`alert ${successMessage.includes('Erro') ? 'alert-danger' : 'alert-success'}`} role="alert">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="serviceNameInput" className="form-label">Nome do Serviço</label>
                    <input
                        type="text"
                        className="form-control"
                        id="serviceNameInput"
                        placeholder="Ex: Netflix, Spotify, Amazon Prime Video"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Salvar Serviço</button>
            </form>
        </div>
    );
};

export default RegistroServico;
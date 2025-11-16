import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EsqueciMinhaSenha, RedefinirSenha, type EsqueciMinhaSenhaRequestDto, type RedefinirSenhaRequestDto } from '../../services/authService';

function EsqueciSenha(){
    const navigate = useNavigate();
    
    const [step, setStep] = useState<'email' | 'reset'>('email'); 
    
    const [emailData, setEmailData] = useState<EsqueciMinhaSenhaRequestDto>({ email: '' });
    const [resetData, setResetData] = useState<RedefinirSenhaRequestDto>({ 
        codigo: '', 
        novaSenha: '', 
        confirmacaoSenha: '' 
    });

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'danger' } | null>(null);

    const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);

        try {
            await EsqueciMinhaSenha(emailData);
            
            setMessage({ text: 'Código enviado para o seu e-mail. Por favor, verifique sua caixa de entrada.', type: 'success' });
            setStep('reset');
            
        } catch (error) {
            console.error("Erro ao solicitar código:", error);
            setMessage({ text: 'Erro ao enviar o e-mail. Verifique o endereço.', type: 'danger' });
        }
    };
    
    const handleResetSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);

        if (resetData.novaSenha !== resetData.confirmacaoSenha) {
            setMessage({ text: 'As senhas não coincidem.', type: 'danger' });
            return;
        }

        try {

            await RedefinirSenha(resetData);

            // await axios.post(`${API_URL}/usuarios/registrarnovasenha`, {
            //     email: emailData.email,
            //     token: resetData.codigo,
            //     senha: resetData.novaSenha
            // });

            setMessage({ text: 'Senha redefinida com sucesso! Você será redirecionado.', type: 'success' });
            
            setTimeout(() => {
                navigate('/');
            }, 2000); 

        } catch (error) {
            console.error("Erro ao redefinir senha:", error);
            setMessage({ text: 'Erro ao redefinir senha. Verifique se o código ou senha está correto e tente novamente.', type: 'danger' });
        }
    };

    const renderEmailStep = () => (
        <form onSubmit={handleEmailSubmit}>
            <h2 className="mb-4">Esqueci Minha Senha</h2>
            <p className="text-muted mb-4">
                Informe seu e-mail para receber o código de recuperação.
            </p>
            
            {message && <div className={`alert alert-${message.type}`} role="alert">{message.text}</div>}

            <div className="mb-4">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input 
                    type="email" 
                    name="email" 
                    className="form-control" 
                    id="email" 
                    value={emailData.email} 
                    onChange={(e) => setEmailData({ email: e.target.value })} 
                    placeholder="Digite seu e-mail" 
                    required
                />
            </div>
            
            <button type="submit" className="btn btn-primary w-100 mb-3">Enviar Código</button>
            <div className="text-center mt-3">
                <Link to="/">Voltar para Login</Link>
            </div>
        </form>
    );

    const renderResetStep = () => (
        <form onSubmit={handleResetSubmit}>
            <h2 className="mb-4">Redefinir Senha</h2>
            <p className="text-muted mb-4">
                Insira o código e defina sua nova senha.
            </p>

            {message && <div className={`alert alert-${message.type}`} role="alert">{message.text}</div>}
            
            <div className="mb-3">
                <label htmlFor="codigo" className="form-label">Código de Recuperação</label>
                <input 
                    type="text" 
                    name="codigo" 
                    className="form-control" 
                    id="codigo" 
                    value={resetData.codigo} 
                    onChange={(e) => setResetData(p => ({ ...p, codigo: e.target.value }))} 
                    placeholder="Insira o código" 
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="novaSenha" className="form-label">Nova Senha</label>
                <input 
                    type="password" 
                    name="novaSenha" 
                    className="form-control" 
                    id="novaSenha" 
                    value={resetData.novaSenha} 
                    onChange={(e) => setResetData(p => ({ ...p, novaSenha: e.target.value }))} 
                    placeholder="Nova senha" 
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="confirmacaoSenha" className="form-label">Confirme a Nova Senha</label>
                <input 
                    type="password" 
                    name="confirmacaoSenha" 
                    className="form-control" 
                    id="confirmacaoSenha" 
                    value={resetData.confirmacaoSenha} 
                    onChange={(e) => setResetData(p => ({ ...p, confirmacaoSenha: e.target.value }))} 
                    placeholder="Confirme a nova senha" 
                    required
                />
            </div>
            
            <button type="submit" className="btn btn-success w-100">Salvar Nova Senha</button>
            <div className="text-center mt-3">
                <Link to="/">Voltar para Login</Link>
            </div>
        </form>
    );

    return (
        <div className="p-4">
            {step === 'email' ? renderEmailStep() : renderResetStep()}
        </div>
    );
}

export default EsqueciSenha;
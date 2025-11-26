import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrarNovoUsuario, type CadastroRequestDto } from "../../services/authService";

function Cadastrese() {
    const navigator = useNavigate();

    const [formData, setFormData] = useState<CadastroRequestDto>({
        nome: '',
        email: '',
        senha: '',
        role: 'ROLE_ASSINANTE'
    });

    const handleCadastro = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await registrarNovoUsuario(formData);

            navigator("/"); 

        } catch (error) {
            console.error("Erro no cadastro:", error);
        }
    }

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>
            <h2 className="mb-4">Cadastro</h2>
            <form onSubmit={handleCadastro}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input type="text" name="nome" className="form-control" id="nome" placeholder="Digite seu nome completo" onChange={handlerChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input type="email" name="email" className="form-control" id="email" placeholder="Digite seu e-mail" onChange={handlerChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="senha" className="form-label">Senha</label>
                    <input type="password" name="senha" className="form-control" id="senha" placeholder="Crie uma senha" onChange={handlerChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input type="text" name="cpf" className="form-control" id="cpf" placeholder="Digite seu CPF" onChange={handlerChange} required />
                </div>
                <button type="submit" className="btn btn-success w-100">Cadastrar</button>
                <div className="text-center mt-3">
                    <span>Já tem uma conta? </span>
                    <Link to="/">Faça login</Link>
                </div>
            </form>
        </div>
    );
}

export default Cadastrese;
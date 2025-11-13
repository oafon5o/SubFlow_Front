import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginSucesso } from "../../redux/authSlice";
import { LoginNovo, type LoginRequestDto } from "../../services/authService";

// criacao de objetos, se o projeto for pequeno cria uma pasta de types, e se for grande, cria pasta de types e dentro da pasta de types cria subpastas para cada tipo
// estilo backend em questão de organização

function Login() {

    const navigator = useNavigate();

    const dispatch = useDispatch();

    const [formData, setFormData] = useState<LoginRequestDto>({
        email: '',
        senha: ''
    });

    const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            const loginResponseDto = await LoginNovo(formData);
            const token = loginResponseDto.token;

            console.log(token);
            if (token != null) {
                dispatch(loginSucesso({
                    usuario:{email:formData.email, nome: ""}, token : token
                }));

                navigator("/home")
            }
        } catch (error) {
        }
    }

    return (
        <form onSubmit={handlerSubmit}>
            <h2 className="mb-4">Login</h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input type="text" name="email" className="form-control" id="email" value={formData.email} onChange={handlerChange} placeholder="Digite seu e-mail" />
            </div>
            <div className="mb-3">
                <label htmlFor="senha" className="form-label">Senha</label>
                <input type="password" name="senha" className="form-control" id="senha" value={formData.senha} onChange={handlerChange} placeholder="Digite sua senha" />
            </div>
            <div className="text-left mb-3">
                <Link to="/esqueciSenha">Esqueci minha senha</Link>
            </div>
            <button type="submit" className="btn btn-primary w-100">Entrar</button>
            <div className="text-center mt-3">
                <span>Não tem uma conta? </span>
                <Link to="/cadastro">Cadastre-se</Link>
            </div>
        </form>
    );
}

export default Login;
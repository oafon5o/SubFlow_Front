import { Link } from "react-router-dom";

function Header(){
    const headerBgColor = "#1c2c4b"; 

    return(
        <header style={{ backgroundColor: headerBgColor }} className="text-white py-3">
            <nav className="container d-flex justify-content-center gap-4">
                <Link to="/home" className="text-white text-decoration-none">Home</Link>
                <Link to="/registroServico" className="text-white text-decoration-none">Registro de Serviço</Link>
                <Link to="/statusAssinatura" className="text-white text-decoration-none">Status de sua assinatura</Link>
                <Link to="/usuarios" className="text-white text-decoration-none">Painel de usuários</Link>
                <Link to="/" className="text-white text-decoration-none">Sair</Link>
            </nav>
        </header>
    );
}

export default Header;
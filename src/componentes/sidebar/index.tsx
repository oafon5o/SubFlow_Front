import { Link } from "react-router-dom";

function Sidebar() {
    const sidebarBgColor = "#1c2c4b"; 

    return (
        <div className="text-white vh-100 p-3" style={{ width: '250px', backgroundColor: sidebarBgColor }}>
            <div className="text-center mb-4">
                <div style={{ fontSize: '30px', fontWeight: 'bold' }}>
                    <span style={{ color: '#fff' }}>Sub</span>
                    <span style={{ color: '#3498db' }}>Flow</span>
                </div>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/home" className="nav-link text-white">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/registroServico" className="nav-link text-white">
                        Registro de Serviço
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/statusAssinatura" className="nav-link text-white">
                        Status de sua assinatura
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/usuarios" className="nav-link text-white">
                        Painel de usuários
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
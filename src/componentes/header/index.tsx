import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const headerBgColor = "#1c2c4b";

    const userIdLogado = 1;
    const isLinkVisible = true;

    return (
        <header style={{ backgroundColor: headerBgColor }} className="text-white py-3 shadow-md">
            <nav className="container d-flex align-items-center" style={{ position: 'relative' }}>

                <div style={{ width: '200px' }} className="d-flex justify-content-start">
                </div>

                <div className="d-flex justify-content-center flex-grow-1 gap-4">
                    <Link to="/home" className="text-white text-decoration-none">Home</Link>
                    <Link to="/registroServico" className="text-white text-decoration-none">Registro de Serviço</Link>
                    <Link to="/statusAssinatura" className="text-white text-decoration-none">Painel de assinaturas</Link>
                    <Link to="/usuarios" className="text-white text-decoration-none">Painel de usuários</Link>
                </div>

                <div className="d-flex justify-content-end" style={{ width: '200px' }}>
                    <div className="dropdown">
                        <button
                            className="btn btn-sm btn-outline-light d-flex align-items-center dropdown-toggle"
                            type="button"
                            id="perfilDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <FontAwesomeIcon icon={faUserCircle} className="me-2" size="lg" />
                            Meu perfil
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="perfilDropdown">

                            {isLinkVisible && (
                                <li>
                                    <Link
                                        to={`/perfil/${userIdLogado}`}
                                        className="dropdown-item"
                                    >
                                        <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                                        Visualizar Perfil
                                    </Link>
                                </li>
                            )}

                            <li><hr className="dropdown-divider" /></li>

                            <li>
                                <Link to="/" className="dropdown-item text-danger">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                    Sair
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
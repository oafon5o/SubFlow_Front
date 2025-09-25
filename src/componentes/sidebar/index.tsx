import { Link } from "react-router-dom";

function Sidebar() {
    // Cor de fundo levemente ajustada para combinar com o azul marinho da logo
    const sidebarBgColor = "#2c3e50"; // Azul marinho escuro, combinando com a logo

    return (
        <div className="text-white vh-100 p-3" style={{ width: '250px', backgroundColor: sidebarBgColor }}>
            <div className="text-center mb-4">
                <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiMyYzNlNTAiLz48dGV4dCB4PSIyMCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgZmlsbD0iI2ZmZiI+U3ViPC90ZXh0Pjx0ZXh0IHg9IjkzIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjMwIiBmaWxsPSIjMzg1Zjc2Ij5GbG93PC90ZXh0Pjwvc3ZnPg=="
                    alt="SubFlow Logo"
                    className="img-fluid"
                    style={{ maxHeight: '60px' }}
                />
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/home" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-house-door-fill me-2"></i> {/* Ícone de casa */}
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/registroServico" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-file-earmark-plus-fill me-2"></i> {/* Ícone de arquivo com mais */}
                        Registro de Serviço
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/statusAssinatura" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-credit-card-2-front-fill me-2"></i> {/* Ícone de cartão de crédito */}
                        Status de sua assinatura
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
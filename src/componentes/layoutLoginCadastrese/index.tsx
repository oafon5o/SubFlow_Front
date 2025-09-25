// src/layouts/LayoutAuth.tsx
import { Outlet } from "react-router-dom";

function LayoutLoginCadastrese() {
  // Cores baseadas na imagem de referência e na logo "SubFlow"
  const primaryBlue = "#1a2a4b"; // Azul escuro do fundo da imagem
  const lighterBlue = "#385f76"; // Azul um pouco mais claro para a coluna da logo

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 p-3" style={{ backgroundColor: primaryBlue }}>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 bg-white rounded shadow-lg p-0" style={{ minHeight: '600px' }}>
            <div className="row g-0">
              {/* Lado esquerdo - Informações e Logo */}
              <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 text-white" style={{ backgroundColor: lighterBlue }}>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMjAwIDYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiM0MjhlZjUiLz48dGV4dCB4PSIyMCIgeT0iNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgZmlsbD0iI2ZmZiI+U3ViPC90ZXh0Pjx0ZXh0IHg9IjkzIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjMwIiBmaWxsPSIjMzg1Zjc2Ij5GbG93PC90ZXh0Pjwvc3ZnPg=="
                  alt="SubFlow Logo"
                  className="mb-4"
                  style={{ maxWidth: '180px', height: 'auto' }}
                />
                <h3 className="text-center mb-3">Gerencie suas assinaturas</h3>
                <p className="text-center fs-5">Mantenha o controle de seus serviços de streaming de forma simples e eficiente.</p>
              </div>

              {/* Lado direito - Onde o formulário de Login ou Cadastro será renderizado */}
              <div className="col-md-6 d-flex flex-column justify-content-center p-5">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutLoginCadastrese;
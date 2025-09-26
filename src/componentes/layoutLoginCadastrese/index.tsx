import { Outlet } from "react-router-dom";

function LayoutLoginCadastrese() {
  const primaryBlue = "#1c2c4b"; 
  const sidebarBlue = "#283b5f"; 

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ backgroundColor: primaryBlue }}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div 
            className="col-12 col-md-10 col-lg-8 bg-white rounded-4 shadow-lg p-0" 
            style={{ minHeight: '600px', overflow: 'hidden' }}
          >
            <div className="row g-0 h-100">
              {}
              <div 
                className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 text-white h-100" 
                style={{ backgroundColor: sidebarBlue, borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}
              >
                {}
                <div className="mb-4" style={{ fontSize: '40px', fontWeight: 'bold' }}>
                    <span style={{ color: '#fff' }}>Sub</span>
                    <span style={{ color: '#3498db' }}>Flow</span>
                </div>
                <h3 className="text-center mb-3 fw-bold">Gerencie suas assinaturas</h3>
                <p className="text-center fs-5 opacity-75">Mantenha o controle de seus serviços de streaming de forma simples e eficiente.</p>
              </div>

              {}
              <div className="col-md-6 d-flex flex-column justify-content-center p-5 h-100">
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
import { Route, Routes } from "react-router-dom";
import LayoutAdminServicoStatus from "./componentes/layoutAdmServicoStatus";
import Home from "./pages/home/home";
import RegistroServico from "./pages/registroServico";
import StatusAssinatura from "./pages/statusAssinatura";
import LayoutLoginCadastrese from "./componentes/layoutLoginCadastrese";
import Login from "./pages/login";
import Cadastrese from "./pages/cadastrese";
import Admin from "./pages/admin";

function AppRoutes(){
    return(
        <Routes>
            <Route element={<LayoutLoginCadastrese />}>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastrese />} />
            </Route>
            <Route element={<LayoutAdminServicoStatus />}>
                <Route path="/home" element={<Home />} />
                <Route path="/registroServico" element={<RegistroServico />} />
                <Route path="/statusAssinatura" element={<StatusAssinatura />} />
                <Route path="/admin" element={<Admin />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
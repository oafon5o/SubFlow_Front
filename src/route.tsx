import { Route, Routes } from "react-router-dom";
import LayoutServicoStatus from "./componentes/layoutServicoStatus";
import Home from "./pages/home/home";
import RegistroServico from "./pages/registroServico";
import StatusAssinatura from "./pages/statusAssinatura";
import LayoutLoginCadastrese from "./componentes/layoutLoginCadastrese";
import Login from "./pages/login";
import Cadastrese from "./pages/cadastrese";
import UsuarioListar from "./pages/listaUsuarios";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<LayoutLoginCadastrese />}>
                <Route index element={<Login />} />
                <Route path="/cadastro" element={<Cadastrese />} />
            </Route>
            <Route element={<LayoutServicoStatus />}>
                <Route path="/home" element={<Home />} />
                <Route path="/registroServico" element={<RegistroServico />} />
                <Route path="/statusAssinatura" element={<StatusAssinatura />} />
                <Route path="/usuarios" element={<UsuarioListar />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
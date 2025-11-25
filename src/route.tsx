import { Route, Routes } from "react-router-dom";
import LayoutServicoStatus from "./componentes/layoutServicoStatus";
import LayoutLoginCadastrese from "./componentes/layoutLoginCadastrese";

import Login from "./pages/login";
import Cadastrese from "./pages/cadastrese";
import EsqueciSenha from "./pages/esqueciSenha";

import Home from "./pages/home/home";
import RegistroServico from "./pages/registroServico";

import StatusAssinaturaListar from "./pages/statusAssinatura/statusAssinaturaListar";
import StatusAssinaturaDetalhes from "./pages/statusAssinatura/statusAssinaturaDetalhes";

import UsuarioListar from "./pages/listaUsuarios";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<LayoutLoginCadastrese />}>
                <Route index element={<Login />} />
                <Route path="/cadastro" element={<Cadastrese />} />
                <Route path="/esqueciSenha" element={<EsqueciSenha />} />
            </Route>

            <Route element={<LayoutServicoStatus />}>
                <Route path="/home" element={<Home />} />
                <Route path="/registroServico" element={<RegistroServico />} />
                <Route path="/statusAssinatura" element={<StatusAssinaturaListar />} />
                <Route path="/statusAssinatura" element={<StatusAssinaturaDetalhes />} />
                <Route path="/usuarios" element={<UsuarioListar />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
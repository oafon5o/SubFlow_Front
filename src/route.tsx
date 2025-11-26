import { Route, Routes } from "react-router-dom";
import LayoutServicoStatus from "./componentes/layoutServicoStatus";
import LayoutLoginCadastrese from "./componentes/layoutLoginCadastrese";

import Login from "./pages/login";
import Cadastrese from "./pages/cadastrese";
import EsqueciSenha from "./pages/esqueciSenha";

import Home from "./pages/home/home";
import RegistroServico from "./pages/registroServico";

import StatusAssinaturaListar from "./pages/statusAssinatura/statusAssinaturaListar";
import RecentesAssinatura from "./pages/recentesAssinatura";

import UsuarioListar from "./pages/listaUsuarios";

import VisualizarPerfil from "./pages/visualizarPerfil";

import UsuarioAlteracaoPage from "./pages/alteracaoUsuario/usuarioAlteracaoPage";

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
                <Route path="/recentesAssinatura" element={<RecentesAssinatura />} />
                <Route path="/usuarios" element={<UsuarioListar />} />
                <Route path="/alterarUsuario/:id" element={<UsuarioAlteracaoPage />} />
                <Route path="/perfil/:id" element={<VisualizarPerfil />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
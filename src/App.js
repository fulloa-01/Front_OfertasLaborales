import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Formulario from './components/views/formulario';
import VistaOfertas from './components/views/vistaOfertas';
import VistaPostulantes from './components/views/vistaPostulantes';
import Home from './components/views/home';
import IngresaCV from './components/views/IngresaCV';
import VistaOfertasAdm from './components/views/vistaOfertasAdm';
import Login from './components/views/login'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const ProtectedRoute = ({ element }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    const location = useLocation();
    const shouldShowNavbar = location.pathname !== '/administrar';

    return (
        <div className="App">
            <div className="container">
                {shouldShowNavbar && (
                    <nav className="navbar navbar-expand-lg bg-danger" data-bs-theme="dark">
                        <div className="container">
                            <Link className="navbar-brand" to="/">Ofertas</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to="/">Inicio</Link>
                                    </li> */}
                                    {isAuthenticated && (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/crear-oferta">Crear Oferta</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/editar-ofertas">Editar Ofertas</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/ver-postulantes">Ver Postulantes</Link>
                                            </li>
                                            <li className="nav-item">
                                                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
            <Routes>
                <Route path="/" element={<VistaOfertas />} />
                <Route path="/crear-oferta" element={<ProtectedRoute element={<Formulario />} />} />
                <Route path="/ver-ofertas" element={<VistaOfertas />} />
                <Route path="/editar-ofertas" element={<ProtectedRoute element={<VistaOfertasAdm />} />} />
                <Route path="/ingresa-cv" element={<IngresaCV />} />
                <Route path="/ver-postulantes" element={<ProtectedRoute element={<VistaPostulantes />} />} />
                <Route path="/administrar" element={<Login onLogin={handleLogin} />} />
            </Routes>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

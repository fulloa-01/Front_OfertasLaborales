import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Formulario from './components/views/formulario';
import VistaOfertas from './components/views/vistaOfertas';
import VistaPostulantes from './components/views/vistaPostulantes';
import Home from './components/views/home';
import IngresaCV from './components/views/IngresaCV';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap CSS en el nivel superior si aún no está hecho

function App() {
    const [formData, setFormData] = useState({
        titulo: '',
        nivelAlcanzado: '',
        departamento: '',
        anosExperiencia: '',
        detalle: '',
        salario: '',
        vacantes: 1,
        ubicacionGeografica: '',
        aceptaExtranjeros: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3009/api/oferta', formData);
            alert('Oferta creada: ' + response.data.ofertaId);
        } catch (error) {
            alert('Error al crear la oferta');
            console.error(error);
        }
    };

    return (
        <Router>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'red' }}>
                    <Link className="navbar-brand text-white" to="/">Inicio</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/crear-oferta">Crear Oferta</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/ver-ofertas">Ver Ofertas</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-white" to="/ver-postulantes">Ver Postulantes</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/crear-oferta" element={
                        <Formulario formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
                    } />
                    <Route path="/ver-ofertas" element={<VistaOfertas />} />
                    <Route path="/ingresa-cv" element={<IngresaCV />} />
                    <Route path="/ver-postulantes" element={<VistaPostulantes />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

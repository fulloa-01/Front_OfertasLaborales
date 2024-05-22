import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const VistaOfertas = () => {
    const [ofertas, setOfertas] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchOfertas = async () => {
            try {
                const response = await axios.get('http://localhost:3009/api/ofertas');
                setOfertas(response.data);
            } catch (error) {
                console.error('Error al obtener las ofertas:', error);
                alert('Error al cargar las ofertas');
            }
        };

        fetchOfertas();
    }, []);

    
    const handlePostular = (codigoOferta) => {
        navigate('/ingresa-cv', { state: { codigoOferta } });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Ofertas Laborales</h2>
            <button className="btn btn-danger mb-3" onClick={() => navigate('/ingresa-cv')}>Subir Currículum</button>
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Código</th>
                        <th>Cargo</th>
                        <th>Detalle</th>
                        <th>Ubicación</th>
                        <th>Gerencia</th>
                        <th>Vacantes</th>
                        <th>Postulación</th>
                    </tr>
                </thead>
                <tbody>
                    {ofertas.map(oferta => (
                        <tr key={oferta.OfertaID}>
                            <td>{oferta.OfertaID}</td>
                            <td>{oferta.Titulo}</td>
                            <td>{oferta.Detalle}</td>
                            <td>{oferta.UbicacionGeografica}</td>
                            <td>{oferta.Departamento}</td>
                            <td>{oferta.Vacantes}</td>
                            <td>
                            <button className="btn btn-danger mb-3" 
                                onClick={() => handlePostular(oferta.OfertaID)}>Postular
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VistaOfertas;

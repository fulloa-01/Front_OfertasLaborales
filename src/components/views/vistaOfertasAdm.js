import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const VistaOfertasAdm = () => {
    const [ofertas, setOfertas] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editOfferId, setEditOfferId] = useState(null);
    const [formData, setFormData] = useState({
        Titulo: '',
        NivelAlcanzado: '',
        Departamento: '',
        AnosExperiencia: '',
        Detalle: '',
        Salario: '',
        Vacantes: 1,
        UbicacionGeografica: '',
        AceptaExtranjeros: false
    });

    const [departamentos, setDepartamentos] = useState([]);
    const [nivelesAlcanzados, setNivelesAlcanzados] = useState([]);

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

        const fetchDepartamentos = async () => {
            try {
                const response = await axios.get('http://localhost:3009/api/utils/departamentos');
                setDepartamentos(response.data);
            } catch (error) {
                console.error('Error al obtener los departamentos:', error);
                alert('Error al cargar los departamentos');
            }
        };

        const fetchNivelesAlcanzados = async () => {
            try {
                const response = await axios.get('http://localhost:3009/api/utils/nivelesAlcanzados');
                setNivelesAlcanzados(response.data);
            } catch (error) {
                console.error('Error al obtener los niveles alcanzados:', error);
                alert('Error al cargar los niveles alcanzados');
            }
        };

        fetchOfertas();
        fetchDepartamentos();
        fetchNivelesAlcanzados();
    }, []);

    const handleEditar = (id) => {
        const oferta = ofertas.find(o => o.OfertaID === id);
        if (oferta) {
            setFormData({
                Titulo: oferta.Titulo || '',
                NivelAlcanzado: oferta.NivelAlcanzado || '',
                Departamento: oferta.Departamento || '',
                AnosExperiencia: oferta.AnosExperiencia || '',
                Detalle: oferta.Detalle || '',
                Salario: oferta.Salario || '',
                Vacantes: oferta.Vacantes || 1,
                UbicacionGeografica: oferta.UbicacionGeografica || '',
                AceptaExtranjeros: oferta.AceptaExtranjeros !== 0 // Si acepta extranjeros, debe ser true o false
            });
            console.log(oferta)
            setEditOfferId(id);
            setIsEditing(true);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta oferta?')) {
            try {
                await axios.delete(`http://localhost:3009/api/ofertas/${id}`);
                alert('Oferta eliminada correctamente');
                const response = await axios.get('http://localhost:3009/api/ofertas');
                setOfertas(response.data);
            } catch (error) {
                console.error('Error al eliminar la oferta:', error);
                alert('Error al eliminar la oferta');
            }
        };};

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear un objeto con solo los campos que tienen valores válidos
        const updatedFormData = {};
        Object.keys(formData).forEach(key => {
            if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
                updatedFormData[key] = formData[key];
            }
        });

        try {
            await axios.put(`http://localhost:3009/api/ofertas/${editOfferId}`, updatedFormData);
            alert('Oferta actualizada correctamente');
            console.log(updatedFormData)
            setIsEditing(false);
            setEditOfferId(null);
            setFormData({
                Titulo: '',
                NivelAlcanzado: '',
                Departamento: '',
                AnosExperiencia: '',
                Detalle: '',
                Salario: '',
                Vacantes: 1,
                UbicacionGeografica: '',
                AceptaExtranjeros: false
            });
            const response = await axios.get('http://localhost:3009/api/ofertas');
            setOfertas(response.data);
        } catch (error) {
            console.error('Error al actualizar la oferta:', error);
            alert('Error al actualizar la oferta');
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditOfferId(null);
        setFormData({
            Titulo: '',
            NivelAlcanzado: '',
            Departamento: '',
            AnosExperiencia: '',
            Detalle: '',
            Salario: '',
            Vacantes: 1,
            UbicacionGeografica: '',
            AceptaExtranjeros: false
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Ofertas Laborales</h2>
            {isEditing ? (
                <div>
                    <h2 className="mb-4">Editar Oferta Laboral</h2>
                    <form onSubmit={handleSubmit} className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="Titulo" className="text-danger">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Titulo"
                                        name="Titulo"
                                        value={formData.Titulo}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="NivelAlcanzado" className="text-danger">Mínimo Nivel Alcanzado</label>
                                    <select
                                        className="form-control"
                                        id="NivelAlcanzado"
                                        name="NivelAlcanzado"
                                        value={formData.NivelAlcanzado}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione un nivel alcanzado</option>
                                        {nivelesAlcanzados.map((nivel) => (
                                            <option key={nivel.NivelID} value={nivel.NivelID}>{nivel.Descripcion}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Departamento" className="text-danger">Departamento</label>
                                    <select
                                        className="form-control"
                                        id="Departamento"
                                        name="Departamento"
                                        value={formData.Departamento}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione un departamento</option>
                                        {departamentos.map((departamento) => (
                                            <option key={departamento.DepartamentoID} value={departamento.DepartamentoID}>{departamento.Nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label htmlFor="AnosExperiencia" className="text-danger">Años de Experiencia</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="AnosExperiencia"
                                        name="AnosExperiencia"
                                        value={formData.AnosExperiencia}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Detalle" className="text-danger">Detalle</label>
                                    <textarea
                                        className="form-control"
                                        id="Detalle"
                                        name="Detalle"
                                        value={formData.Detalle}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Salario" className="text-danger">Salario</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="Salario"
                                        name="Salario"
                                        value={formData.Salario}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Vacantes" className="text-danger">Vacantes</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="Vacantes"
                                        name="Vacantes"
                                        value={formData.Vacantes}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="UbicacionGeografica" className="text-danger">Ubicación Geográfica</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="UbicacionGeografica"
                                        name="UbicacionGeografica"
                                        value={formData.UbicacionGeografica}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="AceptaExtranjeros"
                                        name="AceptaExtranjeros"
                                        checked={formData.AceptaExtranjeros}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="AceptaExtranjeros">Acepta extranjeros</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-danger">Actualizar</button>
                        <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancelar</button>
                    </form>
                </div>
            ) : (
                <div>
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Código</th>
                                <th>Cargo</th>
                                <th>Detalle</th>
                                <th>Ubicación</th>
                                <th>Gerencia</th>
                                <th>Vacantes</th>
                                <th>Acciones</th>
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
                                        <button className="btn btn-warning mb-3" onClick={() => handleEditar(oferta.OfertaID)}>Editar</button>
                                        <button className="btn btn-danger mb-3" onClick={() => handleEliminar(oferta.OfertaID)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};  


export default VistaOfertasAdm; 

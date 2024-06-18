import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario = () => {
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

  const [departamentos, setDepartamentos] = useState([]);
  const [nivelAlcanzado, setNivelAlcanzado] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_GW_URL}/utils/departamentos`);
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
        alert("Error al cargar los departamentos");
      }
    };

    const fetchNivelAlcanzado = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_GW_URL}/utils/nivelesAlcanzados`);
        setNivelAlcanzado(response.data);
      } catch (error) {
        console.error("Error al obtener los niveles alcanzados:", error);
        alert("Error al cargar los niveles alcanzados");
      }
    };

    fetchDepartamentos();
    fetchNivelAlcanzado();
  }, []);

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
      const response = await axios.post(`${process.env.REACT_APP_API_GW_URL}/ofertas`, formData);
      alert('Oferta creada: ' + response.data.ofertaId);
    } catch (error) {
      alert('Error al crear la oferta');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Generación de Ofertas Laborales</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label text-danger">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="mb-3">
              <label htmlFor="nivelAlcanzado" className="form-label text-danger">Mínimo Nivel Alcanzado</label>
              <select
                className="form-select"
                id="nivelAlcanzado"
                name="nivelAlcanzado"
                value={formData.nivelAlcanzado}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un nivel alcanzado</option>
                {nivelAlcanzado.map((nivel) => (
                  <option key={nivel.NivelID} value={nivel.NivelID}>
                    {nivel.Descripcion}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="mb-3">
              <label htmlFor="departamento" className="form-label text-danger">Departamento</label>
              <select
                className="form-select"
                id="departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un departamento</option>
                {departamentos.map((departamento) => (
                  <option key={departamento.DepartamentoID} value={departamento.DepartamentoID}>
                    {departamento.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">Campo requerido</div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="mb-3">
              <label htmlFor="anosExperiencia" className="form-label text-danger">Años de Experiencia</label>
              <select
                className="form-select"
                id="anosExperiencia"
                name="anosExperiencia"
                value={formData.anosExperiencia}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione los años de experiencia</option>
                <option value="1">Menos de 1 año</option>
                <option value="2">1 año</option>
                <option value="3">2 años</option>
                <option value="4">3 años</option>
                <option value="5">4 años</option>
                <option value="6">5 años</option>
                <option value="7">6 años</option>
                <option value="8">7 años</option>
                <option value="9">8 años</option>
                <option value="10">9 años</option>
                <option value="11">10 años</option>
                <option value="12">+10 años</option>
              </select>
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="mb-3">
              <label htmlFor="detalle" className="form-label text-danger">Detalle</label>
              <textarea
                className="form-control"
                id="detalle"
                name="detalle"
                value={formData.detalle}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="mb-3">
              <label htmlFor="salario" className="form-label text-danger">Salario</label>
              <input
                type="text"
                className="form-control"
                id="salario"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="mb-3">
              <label htmlFor="vacantes" className="form-label text-danger">Vacantes</label>
              <input
                type="number"
                className="form-control"
                id="vacantes"
                name="vacantes"
                value={formData.vacantes}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="mb-3">
              <label htmlFor="ubicacionGeografica" className="form-label text-danger">Ubicación Geográfica</label>
              <input
                type="text"
                className="form-control"
                id="ubicacionGeografica"
                name="ubicacionGeografica"
                value={formData.ubicacionGeografica}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="aceptaExtranjeros"
                name="aceptaExtranjeros"
                checked={formData.aceptaExtranjeros}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="aceptaExtranjeros">Acepta extranjeros</label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-danger">Generar</button>
      </form>
    </div>
  );
};

export default Formulario;

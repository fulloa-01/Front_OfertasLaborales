"// Path: ProyectoLaboral/client/src/components/views/formulario.js";
import React, {useState, useEffect} from "react";
import axios from "axios";
import "../css/Formulario.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Formulario = ({ formData, handleChange, handleSubmit }) => {

  const [departamentos, setDepartamentos] = useState([]);
  const [nivelAlcanzado, setNivelAlcanzado] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await axios.get("http://localhost:3009/api/utils/departamentos");
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
        alert("Error al cargar los departamentos");
      }
    };

    const fetchNivelAlcanzado = async () => {
      try {
        const response = await axios.get("http://localhost:3009/api/utils/nivelesAlcanzados");
        setNivelAlcanzado(response.data);
      } catch (error) {
        console.error("Error al obtener los niveles alcanzados:", error);
        alert("Error al cargar los niveles alcanzados");
      }
    };

    fetchDepartamentos();
    fetchNivelAlcanzado();
  }, []);
    

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Generación de Ofertas Laborales</h2>
      <form onSubmit={handleSubmit} className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="titulo" className="text-danger">
                Título
              </label>
              <input
                type="text"
                className="form-control is-invalid"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="form-group">
              <label htmlFor="nivelAlcanzado" className="text-danger">
                Mínimo Nivel Alcanzado
              </label>
              <select
                className="form-control is-invalid"
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
            <div className="form-group">
              <label htmlFor="departamento" className="text-danger">
                Departamento
              </label>
              <select
                className="form-control is-invalid"
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
            </div>
          </div>
          <div className="col-lg-6">
            <div className="form-group">
              <label htmlFor="anosExperiencia" className="text-danger">
                Años de Experiencia
              </label>
              <select
                className="form-control is-invalid"
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
            <div className="form-group">
              <label htmlFor="detalle" className="text-danger">
                Detalle
              </label>
              <textarea
                className="form-control is-invalid"
                id="detalle"
                name="detalle"
                value={formData.detalle}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="form-group">
              <label htmlFor="salario" className="text-danger">
                Salario
              </label>
              <input
                type="text"
                className="form-control is-invalid"
                id="salario"
                name="salario"
                value={formData.salario}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="form-group">
              <label htmlFor="vacantes" className="text-danger">
                Vacantes
              </label>
              <input
                type="number"
                className="form-control is-invalid"
                id="vacantes"
                name="vacantes"
                value={formData.vacantes}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            <div className="form-group">
              <label htmlFor="ubicacionGeografica" className="text-danger">
                Ubicación Geográfica
              </label>
              <input
                type="text"
                className="form-control is-invalid"
                id="ubicacionGeografica"
                name="ubicacionGeografica"
                value={formData.ubicacionGeografica}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Campo requerido</div>
            </div>
            
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="aceptaExtranjeros"
                name="aceptaExtranjeros"
                checked={formData.aceptaExtranjeros}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="aceptaExtranjeros">
                Acepta extranjeros
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-danger">
          Generar
        </button>
      </form>
    </div>
  );
};

export default Formulario;

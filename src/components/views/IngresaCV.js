import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const IngresaCV = () => {
  const location = useLocation(); // Para acceder al estado de la navegación
  const navigate = useNavigate(); // Para redirigir a otra página

  const [carreras, setCarreras] = useState([]); // Para almacenar las carreras
  const [tipoDibujante, setTipoDibujante] = useState([]); // Para almacenar los tipos de dibujante
  const [tipoInstitucion, setTipoInstitucion] = useState([]); // Para almacenar los tipos de institución
  const [nivelAlcanzado, setNivelAlcanzado] = useState([]); // Para almacenar los niveles alcanzados
  const [universidad, setUniversidad] = useState([]); // Para almacenar las universidades

  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    email: "",
    pretensiones: "",
    ciudad: "",
    codigoOferta: location.state?.codigoOferta || "", // Inicializar con valor de location.state
    carrera: "",
    experienciaDocente: "",
    tipoInstitucion: "",
    nivelAlcanzado: "",
    universidad: "",
    anosExperiencia: 0,
    ultimoCargo: "",
    ultimaActividad: "",
    penultimoCargo: "",
    penultimaActividad: "",
    cvFile: null
  });

  useEffect(() => {
    console.log("Location state:", location.state); // Verificar el contenido de location.state
    if (location.state && location.state.codigoOferta) {
      setFormData((prev) => ({
        ...prev,
        codigoOferta: location.state.codigoOferta
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await axios.get("http://localhost:3009/api/utils/carreras");
        setCarreras(response.data);
      } catch (error) {
        console.error("Error al obtener las carreras:", error);
        alert("Error al cargar las carreras");
      }
    };

    const fetchTipoDibujante = async () => {
      try {
        const response = await axios.get("http://localhost:3009/api/utils/tipoDibujante");
        setTipoDibujante(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de dibujante:", error);
        alert("Error al cargar los tipos de dibujante");
      }
    };

    const fetchTipoInstitucion = async () => {
      try {
        const response = await axios.get("http://localhost:3009/api/utils/tipoInstitucion");
        setTipoInstitucion(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de institución:", error);
        alert("Error al cargar los tipos de institución");
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

    const fetchUniversidad = async () => {
      try {
        const response = await axios.get("http://localhost:3009/api/utils/universidades");
        setUniversidad(response.data);
      } catch (error) {
        console.error("Error al obtener las universidades:", error);
        alert("Error al cargar las universidades");
      }
    };

    fetchCarreras();
    fetchTipoDibujante();
    fetchTipoInstitucion();
    fetchNivelAlcanzado();
    fetchUniversidad();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "cvFile") {
        formDataToSend.append(key, formData[key], formData[key].name);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:3009/api/postulacion",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert("CV enviado correctamente");
      console.log(formData);
      navigate("/ver-ofertas");
    } catch (error) {
      console.log(formData);
      alert("Error al enviar el CV");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Trabaja con Nosotros</h2>
      <form onSubmit={handleSubmit}>
        {/* Rut */}
        <div className="mb-3">
          <label htmlFor="rut" className="form-label">
            Rut
          </label>
          <input
            type="text"
            className="form-control"
            id="rut"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
          />
        </div>

        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        {/* Apellido Paterno */}
        <div className="mb-3">
          <label htmlFor="apellidoPaterno" className="form-label">
            Apellido Paterno
          </label>
          <input
            type="text"
            className="form-control"
            id="apellidoPaterno"
            name="apellidoPaterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
          />
        </div>

        {/* Apellido Materno */}
        <div className="mb-3">
          <label htmlFor="apellidoMaterno" className="form-label">
            Apellido Materno
          </label>
          <input
            type="text"
            className="form-control"
            id="apellidoMaterno"
            name="apellidoMaterno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Pretensiones */}
        <div className="mb-3">
          <label htmlFor="pretensiones" className="form-label">
            Pretensiones
          </label>
          <input
            type="text"
            className="form-control"
            id="pretensiones"
            name="pretensiones"
            value={formData.pretensiones}
            onChange={handleChange}
          />
        </div>

        {/* Ciudad */}
        <div className="mb-3">
          <label htmlFor="ciudad" className="form-label">
            Ciudad
          </label>
          <input
            type="text"
            className="form-control"
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />
        </div>

        {/* Código Oferta */}
        <div className="mb-3">
          <label htmlFor="codigoOferta" className="form-label">
            Código Oferta
          </label>
          <input
            type="text"
            className="form-control"
            id="codigoOferta"
            name="codigoOferta"
            value={formData.codigoOferta}
            onChange={handleChange}
          />
        </div>
        <h2 className="mt-5 mb-3">Nivel Educacional</h2>

        {/* Carrera */}
        <div className="mb-3">
          <label htmlFor="carrera" className="form-label">
            Carrera
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="carrera"
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
          >
            <option value="">Seleccione una Opción</option>
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Experiencia Dibujante */}
        <div className="mb-3">
          <label htmlFor="experienciaDocente" className="form-label">
            Experiencia Dibujante
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="experienciaDocente"
            name="experienciaDocente"
            value={formData.experienciaDocente}
            onChange={handleChange}
          >
            <option value="">Seleccione una Opción</option>
            {tipoDibujante.map((tipoDibujante) => (
              <option key={tipoDibujante.id} value={tipoDibujante.id}>
                {tipoDibujante.descripcion}
              </option>
            ))}
          </select>
        </div>

        {/* Institución */}
        <div className="mb-3">
          <label htmlFor="tipoInstitucion" className="form-label">
            Tipo de Institución
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="tipoInstitucion"
            name="tipoInstitucion"
            value={formData.tipoInstitucion}
            onChange={handleChange}
          >
            <option value="">Seleccione una Opción</option>
            {tipoInstitucion.map((tipoInstitucion) => (
              <option key={tipoInstitucion.id} value={tipoInstitucion.id}>
                {tipoInstitucion.descripcion}
              </option>
            ))}
          </select>
        </div>

        {/* Nivel */}
        <div className="mb-3">
          <label htmlFor="nivelAlcanzado" className="form-label">
            Nivel Alcanzado
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="nivelAlcanzado"
            name="nivelAlcanzado"
            value={formData.nivelAlcanzado}
            onChange={handleChange}
          >
            <option value="">Seleccione una Opción</option>
            {nivelAlcanzado.map((nivelAlcanzado) => (
              <option key={nivelAlcanzado.id} value={nivelAlcanzado.id}>
                {nivelAlcanzado.Descripcion}
              </option>
            ))}
          </select>
        </div>

        {/* Universidad */}
        <div className="mb-3">
          <label htmlFor="universidad" className="form-label">
            Universidad
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="universidad"
            name="universidad"
            value={formData.universidad}
            onChange={handleChange}
          >
            <option value="">Seleccione una Opción</option>
            {universidad.map((universidad) => (
              <option key={universidad.id} value={universidad.id}>
                {universidad.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Experiencia */}
        <div className="form-group">
          <label htmlFor="anosExperiencia" className="form-label">
            Años Experiencia
          </label>
          <input
            type="number"
            className="form-control"
            required
            id="anosExperiencia"
            name="anosExperiencia"
            value={formData.anosExperiencia}
            onChange={handleChange}
          />
        </div>

        <h2 className="mt-5 mb-3">Antecedentes Laborales</h2>
        <h3 className="mt-3 mb-3">Último antecedente Laboral</h3>

        {/* Ultimo Cargo */}
        <div className="mb-3">
          <label htmlFor="ultimoCargo" className="form-label">
            Cargo Ocupado
          </label>
          <input
            className="form-control"
            type="text"
            id="ultimoCargo"
            name="ultimoCargo"
            value={formData.ultimoCargo}
            onChange={handleChange}
          ></input>
        </div>

        {/* Ultima Actividad */}
        <div className="mb-3">
          <label htmlFor="ultimaActividad" className="form-label">
            Actividad Desarrollada
          </label>
          <input
            className="form-control"
            type="text"
            id="ultimaActividad"
            name="ultimaActividad"
            value={formData.ultimaActividad}
            onChange={handleChange}
          ></input>
        </div>

        <h3 className="mt-3 mb-3">Penúltimo antecedente Laboral</h3>

        {/* Penúltimo Cargo */}
        <div className="mb-3">
          <label htmlFor="penultimoCargo" className="form-label">
            Cargo Ocupado
          </label>
          <input
            className="form-control"
            type="text"
            id="penultimoCargo"
            name="penultimoCargo"
            value={formData.penultimoCargo}
            onChange={handleChange}
          ></input>
        </div>

        {/* Ultima Actividad */}
        <div className="mb-3">
          <label htmlFor="penultimaActividad" className="form-label">
            Actividad Desarrollada
          </label>
          <input
            className="form-control"
            type="text"
            id="penultimaActividad"
            name="penultimaActividad"
            value={formData.penultimaActividad}
            onChange={handleChange}
          ></input>
        </div>

        {/* Archivo CV */}
        <div className="mb-3">
          <label htmlFor="cvFile" className="form-label">
            Adjuntar CV
          </label>
          <input
            type="file"
            className="form-control"
            id="cvFile"
            name="cvFile"
            onChange={handleChange}
            accept=".pdf,.doc,.docx"
          />
        </div>
        <div className="d-grid gap-2 d-md-block">
          <button type="submit" className="btn btn-primary">
            Enviar Currículum
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => (window.location.href = "/ver-ofertas")}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default IngresaCV;

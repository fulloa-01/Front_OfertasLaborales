import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VistaPostulantes = () => {
  const [postulantes, setPostulantes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostulantes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3009/api/postulantes"
        );
        setPostulantes(response.data);
      } catch (error) {
        console.error("Error al obtener los postulantes:", error);
        alert("Error al cargar los postulantes");
      }
    };

    fetchPostulantes();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container mt-5">
        <h2 className="mb-4">Postulantes</h2>
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>N°</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Correo</th>
              <th>Ciudad</th>
              <th>Código Oferta</th>
              <th>Carrera</th>
              <th>Experiencia Docente</th>
              <th>Tipo Institución</th>
              <th>Nivel Alcanzado</th>
              <th>Universidad</th>
              <th>Años Experiencia</th>
              <th>Último Cargo</th>
              <th>Última Actividad</th>
              <th>Penúltimo Cargo</th>
              <th>Penúltima Actividad</th>
              <th>CV URL</th>
            </tr>
          </thead>
          <tbody>
            {postulantes.map((postulante) => (
              <tr key={postulante.PostulacionID}>
                <td>{postulante.PostulacionID}</td>
                <td>{postulante.Nombre}</td>
                <td>{postulante.ApellidoPaterno}</td>
                <td>{postulante.ApellidoMaterno}</td>
                <td>{postulante.Email}</td>
                <td>{postulante.Ciudad}</td>
                <td>{postulante.CodigoOferta}</td>
                <td>{postulante.CarreraNombre}</td>
                <td>{postulante.ExperienciaDocente}</td>
                <td>{postulante.Institucion}</td>
                <td>{postulante.NivelAlcanzado}</td>
                <td>{postulante.UniversidadNombre}</td>
                <td>{postulante.AnosExperiencia}</td>
                <td>{postulante.UltimoCargo}</td>
                <td>{postulante.UltimaActividad}</td>
                <td>{postulante.PenultimoCargo}</td>
                <td>{postulante.PenultimaActividad}</td>
                <td>
                  <a
                    href={postulante.CvURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver CV
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VistaPostulantes;

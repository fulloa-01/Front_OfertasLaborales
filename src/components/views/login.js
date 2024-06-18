import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import mpImage from '../img/pya_marcopolo.jpg';
import '../css/Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3009/api/auth/login', {
        username,
        password
      });
      console.log('Login successful', response.data);
      onLogin(response.data.token);
      navigate('/ver-postulantes'); // Redirigir al usuario después del login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 h-100">
        <div 
          className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center p-5 text-white position-relative bg-overlay"
          style={{
            backgroundImage: `url(${mpImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(255, 0, 0, 0.4)' 
          }}
        >
          <h2><br/>Bienvenido</h2>
        </div>
        <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center p-5 bg-white">
          <div className="text-center mb-4">
            <h2>Iniciar sesión</h2>
            <p>Identifíquese con sus credenciales</p>
          </div>
          <form onSubmit={handleSubmit} className="w-100">
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger w-100 mb-3">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

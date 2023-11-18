// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Produtos from './Produtos';
import Pedidos from './Pedidos';
import Clientes from './Clientes';
import Funcionarios from './Funcionarios';
import './styles.css';

const Navigation = ({ isLoggedIn }) => (
  <div className="navbar">
    {isLoggedIn ? (
      <>
        <Link to="/produtos">Produtos</Link>
	<Link to="/clientes">Clientes</Link>
	<Link to="/pedidos">Pedidos</Link>
	<Link to="/funcionarios">Funcionarios</Link>
        {/* Adicione outros links conforme necessário */}
      </>
    ) : (
      <Link to="/login">Login</Link>
    )}
  </div>
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

  useEffect(() => {
    if (token) {
      configureAxios(token);
    }
  }, [token]);

  const configureAxios = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const handleLogin = async (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div>
        {/* Barra de navegação */}
        <Navigation isLoggedIn={isLoggedIn} />

        {/* Conteúdo principal */}
        <div className="container">
          <Routes>
          <Route
          path="/login"
          element={<Login setToken={(newToken) => {
            setToken(newToken);
            // Armazena o novo token no localStorage
            localStorage.setItem('token', newToken);
          }} />}
        />
        <Route path="/produtos" element={<Produtos />} />  
	<Route path="/clientes" element={<Clientes />} />
	<Route path="/funcionarios" element={<Funcionarios />} />
	<Route path="/pedidos" element={<Pedidos />} />
	  {/* Adicione outras rotas aqui */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;


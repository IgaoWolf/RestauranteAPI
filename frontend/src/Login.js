import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Enviando solicitação de login...');
      
      const response = await axios.post('http://186.237.57.88:3200/login', {
        username,
        password,
      });

      const { token } = response.data;

      // Define o token no estado do App.js
      setToken(token);
      console.log('Token definido:', token);
    } catch (error) {
      console.error('Erro durante o login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Usuário:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;


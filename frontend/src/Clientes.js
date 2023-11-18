import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    listarClientes();
  }, []);

  const listarClientes = async () => {
    try {
      const response = await axios.get('http://186.237.57.88:3200/clientes/listar', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
    }
  };

  const cadastrarCliente = async () => {
    try {
      const response = await axios.post('http://186.237.57.88:3200/clientes/cadastrar', {
        nome,
        email,
        telefone,
        endereco,
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Cliente cadastrado:', response.data);

      // Atualiza a lista de clientes após o cadastro
      listarClientes();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
    }
  };

  return (
    <div className="clients-container">
      <h2>Clientes</h2>

      <form className="clients-form">
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Telefone:
          <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        </label>

        <label>
          Endereço:
          <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
        </label>

        <button type="button" onClick={cadastrarCliente}>
          Cadastrar Cliente
        </button>
      </form>

      <div className="clients-list">
        <h3>Lista de Clientes:</h3>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;


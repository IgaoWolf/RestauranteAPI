// Frontend (React - Funcionarios.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Funcionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [salario, setSalario] = useState('');

  useEffect(() => {
    listarFuncionarios();
  }, []);

  const listarFuncionarios = async () => {
    try {
      const response = await axios.get('http://186.237.57.88:3200/funcionarios/listar', {
        headers: {

                Authorization: localStorage.getItem('token'), // Remova o prefixo "Bearer"

                  },
  });

      setFuncionarios(response.data);
    } catch (error) {
      console.error('Erro ao listar funcionários:', error);
    }
  };

  const cadastrarFuncionario = async () => {
    try {
      const response = await axios.post('http://186.237.57.88:3200/funcionarios/cadastrar', {
        nome,
        cargo,
        salario,
      },{

       headers: {

        Authorization: localStorage.getItem('token'), // Remova o prefixo "Bearer"

          },
        } );

      console.log('Funcionário cadastrado:', response.data);

      // Atualiza a lista de funcionários após o cadastro
      listarFuncionarios();
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);
    }
  };

  return (
    <div>
      <h2>Funcionários</h2>

      <form>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        <label>
          Cargo:
          <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        </label>
        <br />
        <label>
          Salário:
          <input type="text" value={salario} onChange={(e) => setSalario(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={cadastrarFuncionario}>
          Cadastrar Funcionário
        </button>
      </form>

      <div>
        <h3>Lista de Funcionários:</h3>
        <ul>
          {funcionarios.map((funcionario) => (
            <li key={funcionario.id}>{funcionario.nome} - {funcionario.cargo} - R$ {funcionario.salario}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Funcionarios;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './produtos.css'; // Importa o arquivo CSS

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    listarProdutos();
  }, []);

  const listarProdutos = async () => {
    try {
      const response = await axios.get('http://186.237.57.88:3200/produtos/listar', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
    }
  };

  const cadastrarProduto = async () => {
    try {
      const response = await axios.post('http://186.237.57.88:3200/produtos/cadastrar', {
        nome,
        descricao,
        preco,
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Produto cadastrado:', response.data);

      // Limpa os campos após o cadastro
      setNome('');
      setDescricao('');
      setPreco('');

      // Atualiza a lista de produtos após o cadastro
      listarProdutos();
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <div>
      <h2>Produtos</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <br />
        <label>
          Descrição:
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>
        <br />
        <label>
          Preço:
          <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={cadastrarProduto}>
          Cadastrar Produto
        </button>
      </form>

      <div>
        <h3>Lista de Produtos:</h3>
        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado.</p>
        ) : (
          <ul>
            {produtos.map((produto) => (
              <li key={produto.id}>
                {produto.nome} - {produto.descricao} - R$ {produto.preco}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Produtos;


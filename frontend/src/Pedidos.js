import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [mesa, setMesa] = useState('');
  const [pedidoId, setPedidoId] = useState('');
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [numeroPessoas, setNumeroPessoas] = useState('');

  useEffect(() => {
    listarPedidos();
  }, []);

  const listarPedidos = async () => {
    try {
      const response = await axios.get('http://186.237.57.88:3200/pedidos/listar', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
    }
  };

  const cadastrarPedido = async () => {
    try {
      const response = await axios.post('http://186.237.57.88:3200/pedidos/cadastrar', {
        cliente_id: clienteId,
        mesa,
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Pedido cadastrado:', response.data);

      // Atualiza a lista de pedidos após o cadastro
      listarPedidos();
    } catch (error) {
      console.error('Erro ao cadastrar pedido:', error);
    }
  };

  const adicionarProdutoAoPedido = async () => {
    try {
      const response = await axios.post('http://186.237.57.88:3200/pedidos/adicionar-produto', {
        pedido_id: pedidoId,
        produto_id: produtoId,
        quantidade,
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Produto adicionado ao pedido:', response.data);

      // Atualiza a lista de pedidos após adicionar o produto
      listarPedidos();
    } catch (error) {
      console.error('Erro ao adicionar produto ao pedido:', error);
    }
  };

  const criarConta = async () => {
    try {
      const response = await axios.post('http://186.237.57.88:3200/pedidos/criar-conta', {
        pedido_id: pedidoId,
        numero_pessoas: numeroPessoas,
      }, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Conta criada:', response.data);

      // Atualiza a lista de pedidos após criar a conta
      listarPedidos();
    } catch (error) {
      console.error('Erro ao criar conta:', error);
    }
  };

  const fecharConta = async () => {
    try {
      const response = await axios.post(`http://186.237.57.88:3200/pedidos/fechar-conta/${pedidoId}`, null, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Conta fechada:', response.data);

      // Atualiza a lista de pedidos após fechar a conta
      listarPedidos();
    } catch (error) {
      console.error('Erro ao fechar conta:', error);
    }
  };

  return (
    <div>
      <h2>Pedidos</h2>

      <form>
        <label>
          Cliente ID:
          <input type="text" value={clienteId} onChange={(e) => setClienteId(e.target.value)} />
        </label>
        <br />
        <label>
          Mesa:
          <input type="text" value={mesa} onChange={(e) => setMesa(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={cadastrarPedido}>
          Cadastrar Pedido
        </button>
      </form>

      <form>
        <label>
          Pedido ID:
          <input type="text" value={pedidoId} onChange={(e) => setPedidoId(e.target.value)} />
        </label>
        <br />
        <label>
          Produto ID:
          <input type="text" value={produtoId} onChange={(e) => setProdutoId(e.target.value)} />
        </label>
        <br />
        <label>
          Quantidade:
          <input type="text" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={adicionarProdutoAoPedido}>
          Adicionar Produto ao Pedido
        </button>
      </form>

      <form>
        <label>
          Pedido ID para Criar Conta:
          <input type="text" value={pedidoId} onChange={(e) => setPedidoId(e.target.value)} />
        </label>
        <br />
        <label>
          Número de Pessoas:
          <input type="text" value={numeroPessoas} onChange={(e) => setNumeroPessoas(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={criarConta}>
          Criar Conta
        </button>
      </form>

      <form>
        <label>
          Pedido ID para Fechar Conta:
          <input type="text" value={pedidoId} onChange={(e) => setPedidoId(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={fecharConta}>
          Fechar Conta
        </button>
      </form>

      <div>
        <h3>Lista de Pedidos:</h3>
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>{pedido.cliente_id} - {pedido.mesa}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pedidos;



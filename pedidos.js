const express = require('express');
const router = express.Router();
const db = require('./configdb.js');

// Rota para calcular o valor total do pedido com base nos itens do pedido
async function calcularValorTotalDoPedido(cliente_id) {
  const itensPedido = await db.any('SELECT produto_id, quantidade FROM itens_pedido WHERE pedido_id = $1', [cliente_id]);
  let valorTotal = 0;

  for (const item of itensPedido) {
    const produto = await db.one('SELECT preco FROM produtos WHERE id = $1', [item.produto_id]);
    valorTotal += produto.preco * item.quantidade;
  }

  return valorTotal;
}

// Função para executar transação no banco de dados
async function runTransaction(callback) {
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    await callback(client);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// Rota para cadastrar um novo pedido
router.post('/cadastrar', async (req, res) => {
  try {
    const { cliente_id, mesa } = req.body;

    await runTransaction(async (client) => {
      const valorTotal = await calcularValorTotalDoPedido(cliente_id);

      const newPedido = await client.one(
        'INSERT INTO pedidos (cliente_id, mesa, valor_total) VALUES ($1, $2, $3) RETURNING *',
        [cliente_id, mesa, valorTotal]
      );

      res.status(201).json(newPedido);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar pedido' });
  }
});

// Rota para adicionar produtos a um pedido
router.post('/adicionar-produto', async (req, res) => {
  try {
    const { pedido_id, produto_id, quantidade } = req.body;

    await runTransaction(async (client) => {
      const produto = await client.one('SELECT preco FROM produtos WHERE id = $1', [produto_id]);
      const valor_unitario = produto.preco;

      const newItemPedido = await client.one(
        'INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, valor_unitario) VALUES ($1, $2, $3, $4) RETURNING *',
        [pedido_id, produto_id, quantidade, valor_unitario]
      );

      res.status(201).json(newItemPedido);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar produto ao pedido' });
  }
});

// Rota para listar todos os pedidos
router.get('/listar', async (req, res) => {
  try {
    const pedidos = await db.any('SELECT * FROM pedidos');

    res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar pedidos' });
  }
});

// Rota para listar um pedido com os produtos associados e a conta
router.get('/:pedido_id', async (req, res) => {
  try {
    const pedido_id = req.params.pedido_id;

    const pedido = await db.one('SELECT * FROM pedidos WHERE id = $1', [pedido_id]);
    const produtos = await db.any('SELECT ip.*, p.nome AS produto_nome FROM itens_pedido ip INNER JOIN produtos p ON ip.produto_id = p.id WHERE ip.pedido_id = $1', [pedido_id]);
    const conta = await db.oneOrNone('SELECT * FROM contas WHERE pedido_id = $1', [pedido_id]);

    const pedidoComProdutos = {
      pedido,
      produtos,
      conta,
    };

    res.status(200).json(pedidoComProdutos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar pedido com produtos e conta' });
  }
});

// Rota para criar uma nova conta e associá-la a um pedido
router.post('/criar-conta', async (req, res) => {
  try {
    const { pedido_id, numero_pessoas } = req.body;

    await runTransaction(async (client) => {
      const valorTotal = await calcularValorTotalDoPedido(pedido_id);

      const newConta = await client.one(
        'INSERT INTO contas (pedido_id, numero_pessoas, valor_total) VALUES ($1, $2, $3) RETURNING *',
        [pedido_id, numero_pessoas, valorTotal]
      );

      res.status(201).json(newConta);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
});

// Rota para fechar a conta e dividir em no máximo 4 pessoas
router.post('/fechar-conta/:pedido_id', async (req, res) => {
  try {
    const pedido_id = req.params.pedido_id;

    await runTransaction(async (client) => {
      const conta = await client.one('SELECT * FROM contas WHERE pedido_id = $1', [pedido_id]);

      if (!conta) {
        res.status(404).json({ error: 'Conta não encontrada' });
        return;
      }

      if (conta.fechada) {
        res.status(400).json({ error: 'A conta já foi fechada' });
        return;
      }

      const numero_pessoas = conta.numero_pessoas;
      const valorTotal = parseFloat(conta.valor_total);
      const valorDividido = valorTotal / Math.min(numero_pessoas, 4);

      await client.none('UPDATE contas SET valor_total = $1, fechada = TRUE WHERE id = $2', [valorDividido, conta.id]);

      res.status(200).json({ message: 'Conta fechada e dividida em no máximo 4 pessoas' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fechar a conta' });
  }
});

// Rota para gerar o relatório de produção da cozinha
router.get('/relatorio-producao', async (req, res) => {
  try {
    const consultaSQL = `
      SELECT p.nome AS produto, SUM(ip.quantidade) AS quantidade
      FROM pedidos AS ped
      INNER JOIN itens_pedido AS ip ON ped.id = ip.pedido_id
      INNER JOIN produtos AS p ON ip.produto_id = p.id
      WHERE ped.status_pedido = 'Aberto'
      GROUP BY p.nome
    `;

    const relatorio = await db.any(consultaSQL);

    res.status(200).json(relatorio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao gerar o relatório de produção da cozinha' });
  }
});

module.exports = router;


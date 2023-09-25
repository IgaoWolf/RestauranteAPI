const express = require('express');
const router = express.Router();
const db = require('./configdb.js');

// Cadastrar um novo produto
router.post('/cadastrar', async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;

    const newProduto = await db.one(
      'INSERT INTO produtos (nome, descricao, preco) VALUES ($1, $2, $3) RETURNING *',
      [nome, descricao, preco]
    );

    res.status(201).json(newProduto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar produto' });
  }
});

// Listar todos os produtos
router.get('/listar', async (req, res) => {
  try {
    const produtos = await db.any('SELECT * FROM produtos');

    res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
});

module.exports = router;
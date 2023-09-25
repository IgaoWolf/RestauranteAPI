const express = require('express');
const router = express.Router();
const db = require('./configdb.js'); 

// Cadastrar um novo cliente
router.post('/cadastrar', async (req, res) => {
  try {
    const { nome, email, telefone, endereco } = req.body;

    const newCliente = await db.one(
      'INSERT INTO clientes (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, telefone, endereco]
    );

    res.status(201).json(newCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar cliente' });
  }
});

// Listar todos os clientes
router.get('/listar', async (req, res) => {
  try {
    const clientes = await db.any('SELECT * FROM clientes');

    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('./configdb.js');

// Cadastrar um novo funcionário
router.post('/cadastrar', async (req, res) => {
  try {
    const { nome, cargo, salario } = req.body;

    const newFuncionario = await db.one(
      'INSERT INTO funcionarios (nome, cargo, salario) VALUES ($1, $2, $3) RETURNING *',
      [nome, cargo, salario]
    );

    res.status(201).json(newFuncionario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
  }
});

// listar todos os funcionários
router.get('/listar', async (req, res) => {
  try {
    const funcionarios = await db.any('SELECT * FROM funcionarios');

    res.status(200).json(funcionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
});

module.exports = router;
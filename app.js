const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3200;
const verifyJWT = require('./verifyJWT');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'apires',
  password: 'api-res',
  database: 'restaurante',
  host: 'localhost', // ou o endereço do seu banco de dados
  port: 5432, // ou a porta do seu banco de dados
});

// Adicione o middleware cors
app.use(cors());

app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ username }, 'seu_segredo_jwt', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

app.use(verifyJWT);

// Importe o roteador de clientes
const clientesRouter = require('./clientes');
app.use('/clientes', clientesRouter);

// Importe o roteador de funcionários
const funcionariosRouter = require('./funcionarios');
app.use('/funcionarios', funcionariosRouter);

// Importe o roteador de produtos
const produtosRouter = require('./produtos');
app.use('/produtos', produtosRouter);

// Importe o roteador de pedidos
const pedidosRouter = require('./pedidos');
app.use('/pedidos', pedidosRouter);

// Certifique-se de que o cors seja adicionado antes das rotas
app.options('*', cors());

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


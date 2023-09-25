const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const verifyJWT = require('./verifyJWT');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'apires',
  password: 'api-res',
  database: 'restaurante',
  host: 'localhost',
  port: 5432, 
});


app.use(express.json());


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        //usuário
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }

        const user = result.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        //token JWT
        const token = jwt.sign({ username }, 'seu_segredo_jwt', { expiresIn: '1h' });

        // Enviar o token como resposta
        res.json({ token });
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


app.use(verifyJWT);


// Rota de clientes
const clientesRouter = require('./clientes');
app.use('/clientes', clientesRouter);

// Rpta de funcionários
const funcionariosRouter = require('./funcionarios');
app.use('/funcionarios', funcionariosRouter);

// Rota de produtos
const produtosRouter = require('./produtos');
app.use('/produtos', produtosRouter);

// Rota de pedidos
const pedidosRouter = require('./pedidos');
app.use('/pedidos', pedidosRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
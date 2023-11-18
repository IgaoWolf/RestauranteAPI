const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, 'seu_segredo_jwt', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.user = decoded;
// nao sei se isso ta funcionando, ia usar o bycript para criptografar a senha, mas tava dando erro no login dai :)
    next();
  });
}

module.exports = verifyJWT;


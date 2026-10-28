
const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization;

  if (!cabecera || !cabecera.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Debes iniciar sesión'
    });
  }

  const token = cabecera.slice(7);

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);

    if (datos.rol !== 'admin') {
      return res.status(403).json({
        error: 'Acceso denegado'
      });
    }

    req.usuario = datos.usuario;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido o caducado'
    });
  }
}

module.exports = verificarToken;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({
        error: 'Debes introducir usuario y contraseña'
      });
    }

    if (
      usuario !== process.env.ADMIN_USER ||
      !process.env.ADMIN_PASSWORD_HASH ||
      !process.env.JWT_SECRET
    ) {
      return res.status(401).json({
        error: 'Credenciales incorrectas'
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        error: 'Credenciales incorrectas'
      });
    }

    const token = jwt.sign(
      { usuario, rol: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({ token });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);

    return res.status(500).json({
      error: 'Error interno al iniciar sesión'
    });
  }
});

module.exports = router;

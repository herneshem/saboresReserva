const express = require('express');
const router = express.Router();
const pool = require('../db/db');

router.post('/', async (req, res) => {
  try {
    console.log("📩 BODY:", req.body);

    const {
      fecha,
      personas,
      servicio,
      hora,
      nombre,
      apellidos,
      telefono,
      email,
      observaciones
    } = req.body;

    const result = await pool.query(
      `INSERT INTO reservas
      (fecha, personas, servicio, hora, nombre, apellidos, telefono, email, observaciones)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [fecha, personas, servicio, hora, nombre, apellidos, telefono, email, observaciones]
    );

    console.log("🟢 INSERT OK:", result.rows[0]);

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: 'Error creando reserva' });
  }
});

module.exports = router;
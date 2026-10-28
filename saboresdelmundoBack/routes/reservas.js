
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const verificarToken = require('../middleware/auth');

// Obtener todas las reservas: solo administradores
router.get('/', verificarToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM reservas
       ORDER BY fecha DESC, hora DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error('Error consultando reservas:', err);
    res.status(500).json({ error: 'Error consultando reservas' });
  }
});

// Cambiar el estado de una reserva: solo administradores
router.patch('/:id/estado', verificarToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { estado } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ error: 'ID de reserva no válido' });
    }

    const estadosPermitidos = ['pendiente', 'confirmada', 'rechazada'];

    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({ error: 'Estado no válido' });
    }

    const result = await pool.query(
      `UPDATE reservas
       SET estado = $1
       WHERE id = $2
       RETURNING *`,
      [estado, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error actualizando reserva:', err);
    res.status(500).json({ error: 'Error actualizando reserva' });
  }
});

// Crear una reserva: público, sin iniciar sesión
router.post('/', async (req, res) => {
  try {
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
       (fecha, personas, servicio, hora, nombre, apellidos,
        telefono, email, observaciones)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        fecha, personas, servicio, hora, nombre, apellidos,
        telefono, email, observaciones
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creando reserva:', err);
    res.status(500).json({ error: 'Error creando reserva' });
  }
});

module.exports = router;

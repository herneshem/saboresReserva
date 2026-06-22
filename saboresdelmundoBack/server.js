const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/reservas', (req, res) => {

  const reserva = req.body;

  console.log('Nueva reserva:', reserva);

  res.status(201).json({
    mensaje: 'Reserva creada'
  });

});

app.listen(3000, () => {
  console.log('Servidor iniciado en puerto 3000');
});
const express = require('express');
const cors = require('cors');

const reservaRoutes = require('./routes/reservas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/reservas', reservaRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado en puerto 3000');
});
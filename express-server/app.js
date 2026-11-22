const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permitir solicitudes desde Angular
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Permitir recibir datos JSON
app.use(express.json());

// Datos de ejemplo
const urls = [
  'Buenos Aires',
  'Madrid',
  'París',
  'Roma',
  'Londres'
];

// Almacenamiento temporal en memoria
let misDestinos = [];

// GET: obtener destinos disponibles
app.get('/url', (req, res) => {
  res.json(urls);
});

// GET: obtener mis destinos
app.get('/my', (req, res) => {
  res.json(misDestinos);
});

// POST: guardar mis destinos
app.post('/my', (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({
      error: 'Se esperaba un arreglo de destinos'
    });
  }

  misDestinos = req.body;

  res.json(misDestinos);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express funcionando en el puerto ${PORT}`);
});
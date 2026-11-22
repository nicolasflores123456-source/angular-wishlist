const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permitir solicitudes desde Angular
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

// Ciudades disponibles
const ciudades = [
  'Barcelona',
  'Barranquilla',
  'Buenos Aires',
  'Madrid',
  'Lima',
  'Londres',
  'Los Ángeles',
  'París',
  'Roma',
  'Bogotá',
  'Cartagena',
  'Medellín',
  'Tegucigalpa',
  'San Pedro Sula',
  'Roatán'
];

// Mantener la ruta anterior
app.get('/url', (req, res) => {
  res.json(ciudades);
});

// Nueva ruta para buscar ciudades
app.get('/ciudades', (req, res) => {

  const consulta = String(req.query.q ?? '')
    .trim()
    .toLowerCase();

  const resultados = ciudades.filter(ciudad =>
    ciudad.toLowerCase().includes(consulta)
  );

  res.json(resultados);
});

// Almacenamiento temporal
let misDestinos = [];

// Obtener destinos guardados
app.get('/my', (req, res) => {
  res.json(misDestinos);
});

// Guardar destinos
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
  console.log(
    `Servidor Express funcionando en el puerto ${PORT}`
  );
});
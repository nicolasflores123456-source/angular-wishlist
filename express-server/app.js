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

  const nuevo = req.body?.nuevo;

  if (
    !nuevo ||
    typeof nuevo.nombre !== 'string' ||
    typeof nuevo.imagenUrl !== 'string'
  ) {
    return res.status(400).json({
      error: 'El destino enviado no es válido'
    });
  }

  misDestinos.push(nuevo);

  console.log(
    'Nuevo destino recibido:',
    nuevo
  );

  res.json(misDestinos);
});

// Obtener traducciones según el idioma
app.get('/translations', (req, res) => {

  const lenguaje = String(req.query.lang ?? 'es')
    .trim()
    .toLowerCase();

  const traducciones = {
    es: {
      HOLA: 'Hola',
      BIENVENIDO: 'Bienvenido a Angular Wishlist'
    },
    en: {
      HOLA: 'Hello',
      BIENVENIDO: 'Welcome to Angular Wishlist'
    },
    fr: {
      HOLA: 'Bonjour',
      BIENVENIDO: 'Bienvenue sur Angular Wishlist'
    }
  };

  if (!traducciones[lenguaje]) {
    return res.status(400).json({
      error: 'Idioma no disponible'
    });
  }

  res.json(
    Object.entries(traducciones[lenguaje]).map(
      ([key, value]) => ({
        lenguaje,
        key,
        value
      })
    )
  );

});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(
    `Servidor Express funcionando en el puerto ${PORT}`
  );
});
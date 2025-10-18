require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./config/db');
const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 4000;

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI no definido en .env');
  process.exit(1);
}

connectDB(process.env.MONGO_URI);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.get('/', (req, res) => res.json({ ok: true, message: 'API Gestión de Órdenes - Backend' }));
app.use('/orders', ordersRouter);

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});

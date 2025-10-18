const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  destino: {
    type: String,
    required: [true, 'Destino requerido'],
    trim: true
  },
  contenido: {
    type: String,
    required: [true, 'Contenido requerido'],
  },
  fecha_creacion: {
    type: Date,
    default: () => new Date()
  },
  estado: {
    type: String,
    required: true,
    enum: ['pendiente', 'en tránsito', 'entregado'],
    default: 'pendiente',
  }
});

// Index útil para búsquedas por estado y fecha
OrderSchema.index({fecha_creacion: -1 });

module.exports = mongoose.model('Order', OrderSchema);

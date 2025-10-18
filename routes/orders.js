const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /orders - listar con filtros opcionales
// Filtros soportados por query: status, origin, destination, orderNumber, dateFrom, dateTo, minWeight, maxWeight, limit, page
router.get('/', async (req, res) => {
  await Order.find({}).then(orders => {
    res.send(orders)
  })
});

// GET /orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ ok: false, error: 'Orden no encontrada' });
    res.json({ ok: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: 'ID inválido' });
  }
});

// POST /orders
router.post('/', async (req, res) => {
  try {
    const payload = req.body;
    const order = new Order(payload);
    await order.validate();
    await order.save();
    res.status(201).json({ ok: true, data: order });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ ok: false, errors: messages });
    }
    res.status(500).json({ ok: false, error: 'Error al crear orden' });
  }
});

// PUT /orders/:id
router.put('/:id', async (req, res) => {
  try {
    const update = req.body;
    const opts = { new: true, runValidators: true };
    const order = await Order.findByIdAndUpdate(req.params.id, update, opts);
    if (!order) return res.status(404).json({ ok: false, error: 'Orden no encontrada' });
    res.json({ ok: true, data: order });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ ok: false, errors: messages });
    }
    res.status(400).json({ ok: false, error: 'Error al actualizar orden' });
  }
});

// DELETE /orders/:id
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ ok: false, error: 'Orden no encontrada' });
    res.json({ ok: true, message: 'Orden eliminada', data: order });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: 'ID inválido' });
  }
});

module.exports = router;

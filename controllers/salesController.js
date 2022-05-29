const express = require('express');

const router = express.Router();
const salesService = require('../services/salesService');

router.get('/sales', async (req, res) => {
    const [data] = await salesService.getAll();
    res.status(200).json(data);
});

router.get('/sales/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await salesService.getAll(id);
        if (data.length === 0) throw Error;
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: 'Sale not found' });
    }
});

const salesRouter = router;
module.exports = { salesRouter };
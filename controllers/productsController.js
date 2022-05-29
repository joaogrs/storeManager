const express = require('express');

const router = express.Router();
const productsService = require('../services/productsService');

router.get('/products', async (req, res) => {
    const [data] = await productsService.getAll();
    res.status(200).json(data);
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await productsService.getAll(id);
        if (data.length === 0) throw Error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
});

const productsRouter = router;
module.exports = { productsRouter };
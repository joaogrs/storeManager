const salesService = require('../services/salesService');

const getSalesController = async (req, res) => {
    const [data] = await salesService.getAll();
    res.status(200).json(data);
};

const getSalesByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await salesService.getAll(id);
        if (data.length === 0) throw Error;
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: 'Sale not found' });
    }
};

module.exports = {
    getSalesController,
    getSalesByIdController,
 };
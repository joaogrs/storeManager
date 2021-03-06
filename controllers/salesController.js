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

const postSalesController = async (req, res) => {
    const objectPosted = await salesService.add(req.body);
    res.status(201).json(objectPosted);
};

const putSalesController = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await salesService.getAll(id);
        if (data.length === 0) {
            throw Error;
        }
        const updatedObject = await salesService.update(id, req.body);
        res.status(200).json(updatedObject);
    } catch (error) {
        res.status(404).json({ message: 'Sale not found' });
    }
};

const deleteSalesController = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await salesService.getAll(id);
        if (data.length === 0) throw Error;
        await salesService.deleteById(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: 'Sale not found' });
    }
};

module.exports = {
    getSalesController,
    getSalesByIdController,
    postSalesController,
    putSalesController,
    deleteSalesController,
 };
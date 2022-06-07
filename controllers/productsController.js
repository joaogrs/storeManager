const productsService = require('../services/productsService');

const getProductsController = async (req, res) => {
    const [data] = await productsService.getAll();
    return res.status(200).json(data);
};

const getProductsIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await productsService.getAll(id);
        if (data.length === 0) throw Error;
        res.status(200).json(data[0]);
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
};

const postProductsController = async (req, res) => {
    const { name, quantity } = req.body;
    
    const objectAdded = await productsService.add({ name, quantity });

    if (!objectAdded) {
        return res.status(409).json({ message: 'Product already exists' });
    }
    return res.status(201).json(objectAdded);
};

const putProductsController = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    try {
        const [data] = await productsService.getAll(id);
        if (data.length === 0) throw Error;
        const updatedObject = await productsService.uptate(id, { name, quantity });
        res.status(200).json(updatedObject);
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
};

const deleteProductsController = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await productsService.getAll(id);
        if (data.length === 0) throw Error;
        await productsService.deleteById(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
    }
};
module.exports = { 
    postProductsController,
    getProductsController,
    getProductsIdController,
    putProductsController,
    deleteProductsController,
};
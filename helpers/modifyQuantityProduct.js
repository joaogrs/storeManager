const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const modifyQuantityProduct = async (productId, quantityToSubtract) => {
    const [allProducts] = await productsModel.getAll();
    const objectForModify = allProducts.find((p) => p.id === productId);
    const { quantity } = objectForModify;
    await productsModel.uptadeQuantity(productId, (quantity - quantityToSubtract));
};

const deleteSale = async (id) => {
    const [allSales] = await salesModel.getById(id);
    const [allProducts] = await productsModel.getAll();
    allSales.forEach(async (s) => {
        const quantityToAppend = s.quantity;
        const objectForModify = allProducts.find((p) => p.id === s.productId);
        const { quantity } = objectForModify;
        await productsModel.uptadeQuantity(s.productId, (quantity + quantityToAppend));
    });
};

module.exports = { modifyQuantityProduct, deleteSale };

const salesModel = require('../models/salesModel');
const { modifyQuantityProduct, deleteSale } = require('../helpers/modifyQuantityProduct');

const getAll = (id = null) => {
    if (id) {
        return salesModel.getById(id);
    }
    return salesModel.getAll();
};

const add = async (arrayForPost) => {
    const newId = await salesModel.addNewSaleId();
    
    const promisePostObjects = [];
    const promiseModifyQuantity = [];
    const itemsSold = [];
     arrayForPost.forEach((sale) => {
        const { productId, quantity } = sale;
        promisePostObjects.push(salesModel.addNewProductSold(newId, { productId, quantity }));
        promiseModifyQuantity.push(modifyQuantityProduct(productId, quantity));
        return itemsSold.push({ productId, quantity });
    });
    await Promise.all(promisePostObjects);
    await Promise.all(promiseModifyQuantity);
    return { id: newId, itemsSold };
};

const update = async (id, arrayForUpdate) => {
    const itemUpdated = [];
    const promiseUpdateObjects = [];
    arrayForUpdate.forEach(async (sale) => {
        const { productId, quantity } = sale;
        promiseUpdateObjects.push(salesModel.update(id, productId, quantity));
        return itemUpdated.push(sale);
    });
    await Promise.all(promiseUpdateObjects);
    return { saleId: id, itemUpdated };
};

const deleteById = async (id) => {
    await salesModel.deleteById(id);
    await deleteSale(id);
};

module.exports = { getAll, add, update, deleteById };
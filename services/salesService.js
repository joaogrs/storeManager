const salesModel = require('../models/salesModel');

const getAll = (id = null) => {
    if (id) {
        return salesModel.getById(id);
    }
    return salesModel.getAll();
};

const add = async (arrayForPost) => {
    // const [data] = await salesModel.getAll();
   // const lastInfos = data[data.length - 1];
   // const { saleId } = lastInfos;
   // const newId = saleId + 1;
    
    const newId = await salesModel.addNewSaleId();
    
    const promisePostObjects = [];
    const itemsSold = [];
     arrayForPost.forEach((sale) => {
        const { productId, quantity } = sale;
        promisePostObjects.push(salesModel.addNewProductSold(newId, { productId, quantity }));
        return itemsSold.push({ productId, quantity });
    });
    await Promise.all(promisePostObjects);
    return { id: newId, itemsSold };
};

module.exports = { getAll, add };
const productsModel = require('../models/productsModel');

const getAll = (id = null) => {
    if (id) {
        return productsModel.getById(id);
    }
    return productsModel.getAll();
};

const isValid = async (name) => {
    const [data] = await productsModel.getAll();
    const verifyNameAlredyExist = data.find((d) => d.name === name);
    if (verifyNameAlredyExist) return false;
    return true;
};

const add = async ({ name, quantity }) => {
    const [data] = await productsModel.getAll();
    const verifyName = await isValid(name);
    if (!verifyName) return false;

    await productsModel.add({ name, quantity });
    const lastInfos = data[data.length - 1];
    const { id } = lastInfos;
    const newId = id + 1;
    return { id: newId, name, quantity };
};

const uptate = async (id, { name, quantity }) => {
    await productsModel.uptade(id, { name, quantity });
    return { id, name, quantity };
};

const deleteById = async (id) => {
    await productsModel.deleteById(id);
};

module.exports = { getAll, add, uptate, deleteById };
const conect = require('../db/storeManager');

const getAll = () => conect.execute('select * from products');

const getById = (id) => conect.execute('select * from products where products.id = ?', [id]);

module.exports = { getAll, getById };
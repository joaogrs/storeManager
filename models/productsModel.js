const conect = require('../db/storeManager');

const getAll = () => conect.execute('select * from products');

const getById = (id) => conect.execute('select * from products where products.id = ?', [id]);

const add = ({ name, quantity }) => conect.execute(`INSERT INTO products (name, quantity)
VALUES(?, ?)`,
 [name, quantity]);

module.exports = { getAll, getById, add };
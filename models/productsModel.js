const conect = require('../db/storeManager');

const getAll = () => conect.execute('select * from StoreManager.products');

const getById = (id) => conect.execute(`select * from StoreManager.products
where products.id = ?`, [id]);

const add = ({ name, quantity }) => conect.execute(`INSERT INTO StoreManager.products
(name, quantity) VALUES(?, ?)`,
 [name, quantity]);

const uptade = (id, { name, quantity }) => conect.execute(`UPDATE StoreManager.products SET 
name = ?, quantity = ? WHERE id = ?`, [name, quantity, id]);

const deleteById = (id) => conect.execute(`DELETE FROM StoreManager.products
WHERE id = ?;
`, [id]);

module.exports = { getAll, getById, add, uptade, deleteById };
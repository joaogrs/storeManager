const connection = require('../db/storeManager');

const getAll = () => connection.execute(`SELECT sp.sale_id as saleId, s.date, sp.product_id as
productId, sp.quantity FROM sales_products sp INNER JOIN sales s ON s.id = sp.sale_id;`);

const getById = (id) => connection.execute(`SELECT s.date, sp.product_id
as productId, sp.quantity FROM sales_products sp INNER JOIN sales s ON s.id = sp.sale_id
WHERE sp.sale_id = ?`, [id]);

module.exports = { getAll, getById };
const connection = require('../db/storeManager');

const getAll = () => connection.execute(`SELECT sp.sale_id as saleId, s.date, sp.product_id as
productId, sp.quantity FROM StoreManager.sales_products sp INNER JOIN
sales s ON s.id = sp.sale_id;`);

const getById = (id) => connection.execute(`SELECT s.date, sp.product_id
as productId, sp.quantity FROM StoreManager.sales_products sp INNER JOIN sales s ON s.id =
sp.sale_id WHERE sp.sale_id = ?`, [id]);

const addNewSaleId = async () => {
    const [{ insertId }] = await connection.execute(`
    INSERT INTO StoreManager.sales (date)
    VALUES(NOW())`);
    console.log(insertId);
    return insertId;
};

const addNewProductSold = (id, { productId, quantity }) => {
    connection.execute(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`, [id, productId, quantity]);
};

module.exports = { getAll, getById, addNewSaleId, addNewProductSold };
const express = require('express');

const app = express();
app.use(express.json());
const {
  getSalesController,
  getSalesByIdController,
  postSalesController,
  putSalesController,
  deleteSalesController,
} = require('./controllers/salesController');
const { validationProductsMiddleware } = require('./middlewares/products.middleware');
const { validationSalesMiddleware, validationProductQuantity,
} = require('./middlewares/sales.middleware');
const {
  postProductsController,
  getProductsController,
  getProductsIdController,
  putProductsController,
  deleteProductsController,
} = require('./controllers/productsController');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getProductsController);
app.get('/products/:id', getProductsIdController);
app.post('/products', validationProductsMiddleware, postProductsController);
app.put('/products/:id', validationProductsMiddleware, putProductsController);
app.delete('/products/:id', deleteProductsController);
// app.use(productsRouter);
// app.use(salesRouter);
app.get('/sales', getSalesController);
app.get('/sales/:id', getSalesByIdController);
app.post('/sales', validationSalesMiddleware, validationProductQuantity, postSalesController);
app.put('/sales/:id', validationSalesMiddleware, putSalesController);
app.delete('/sales/:id', deleteSalesController);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

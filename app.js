const express = require('express');

const app = express();
app.use(express.json());
const { productsRouter } = require('./controllers/productsController');
const { salesRouter } = require('./controllers/salesController');
const { validationProductsMiddleware } = require('./middlewares/products.middleware');
const { postProductsController } = require('./controllers/productsController');

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validationProductsMiddleware, postProductsController);
app.use(productsRouter);
app.use(salesRouter);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;

const express = require('express');
const app = express();
const { config } = require("./config");
const { getProductsPaginated, getProductById } = require("./utils/data");
const { normalizeProduct, normalizeProducts } = require('./utils/normalizeResponse');

app.get('/products', async function(req, res) {
  const { page, ipp } = req.query;
  const products = await getProductsPaginated(page, ipp);
  const normalizedProducts = normalizeProducts(products);
  res.send(normalizedProducts);
});

app.get('/products/:id', async function(req, res) {
  const { id } = req.params;
  const product = await getProductById(id);
  const normalizedProduct = normalizeProduct(product)
  res.send(normalizedProduct);
});

app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`)
})
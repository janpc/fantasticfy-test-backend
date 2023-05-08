const express = require('express');
const app = express();
const { config } = require("./config");
const { getProductsPaginated, getProductById } = require("./utils/data");

app.get('/products', async function(req, res) {
  const { page, ipp } = req.query;
  const products = await getProductsPaginated(page, ipp);
  res.send(products);
});

app.get('/products/:id', async function(req, res) {
  const { id } = req.params;
  const products = await getProductById(id);
  res.send(products);
});

app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`)
})
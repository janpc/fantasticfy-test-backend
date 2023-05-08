const express = require('express');
const cors = require("cors");
const { config } = require("./config");
const { getProductsPaginated, getProductById } = require("./utils/data");
const { errorMiddleware } = require("./middlewares/error-middleware");

const app = express();

app.use(cors({ origin: config.client.url }));

app.get('/products', async function(req, res, next) {
  const { page, ipp } = req.query;
  try {
    const data = await getProductsPaginated(page, ipp);
    res.send(data);
  } catch (e) {
    console.log(e);
    next(e);
  }
  
});

app.get('/products/:id', async function(req, res, next) {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.send(product);
  } catch (e) {
    next(e);
  }
});

app.use(errorMiddleware);

app.listen(config.app.port, () => {
  console.log(`Example app listening on port ${config.app.port}`)
})
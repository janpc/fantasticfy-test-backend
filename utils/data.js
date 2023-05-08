const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { config } = require("../config");
const { normalizeProduct, normalizeProducts } = require('./normalizeResponse');

async function getAllProducts() {
  const res = await fetch(config.shopify.url, {
    headers: {
      'X-Shopify-Access-Token': config.shopify.token,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data.products;
}

async function getProductById(id) {
  const products = await getAllProducts();
  const productById = products.find(product => product.id == id);

  if (!productById) {
    throw {code: 404, message: 'Product not found!'};
  }

  return normalizeProduct(productById);
}

async function getProductsPaginated(page = 1, ipp = 20) {
  const products = await getAllProducts();

  if (!products) {
    throw new Error(500);
  }
  
  const length = products.length;
  const totalPages = Math.ceil(length / ipp);

  if (page > totalPages) {
    throw {code: 404, message: 'Page not found!'};
  }

  const startPage = (page - 1) * ipp;
  const endPage = page * ipp
  const paginatedProducts = products.slice(startPage, endPage);

  return { totalPages, ipp, page, totalProducts: length, products: normalizeProducts(paginatedProducts) }
}

module.exports = {
  getProductById,
  getProductsPaginated
};
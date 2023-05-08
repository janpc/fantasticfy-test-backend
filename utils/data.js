const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { config } = require("../config");

console.log(config);

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
    throw new Error(404);
  }

  return productById;
}

async function getProductsPaginated(page, ipp) {
  const products = await getAllProducts();

  if (!products) {
    throw new Error(500);
  }
  
  const length = products.length;
  const totalPages = Math.ceil(length / ipp);

  if (page > totalPages) {
    throw new Error(404);
  }

  const startPage = (page - 1) * ipp;
  const endPage = page * ipp
  const paginatedProducts = products.slice(startPage, endPage);

  console.log({totalPages, ipp, page, totalProducts: length, products: paginatedProducts});

  return { totalPages, ipp, page, totalProducts: length, products: paginatedProducts }
}
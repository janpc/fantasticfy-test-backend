function normalizeProduct (product) {
  const normalizedProduct = {
    id: product.id,
    title: product.title,
    body: product.body_html,
    mainImage: product.image,
    images: product.images,
    minPrice: getMinPrice(product.variants),
    options: product.options,
    variants: product.variants
  };

  return normalizedProduct
}

function normalizeProducts (products) {
  const normalizedProducts = [];
  products?.forEach((product) => {
    const normalizedProduct = normalizeProduct(product)
    normalizedProducts.push(normalizedProduct);
  })

  return normalizedProducts;
}


const getMinPrice = (variants) => {
  let minPrice = null;
  variants.forEach(variant => {
    if (!minPrice || minPrice > variant.price) {
      minPrice = variant.price;
    }
  });

  return minPrice;
}

module.exports = {
  normalizeProduct,
  normalizeProducts
};
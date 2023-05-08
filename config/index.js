require("dotenv").config();

const { SHOPIFY_URL, SHOPIFY_ACCES_TOKEN, PORT = 4000 } = process.env;

const baseConfig = {
  app: {
    port: PORT || 4000,
  },
  client: {
    url: process.env.CLIENT_URL || "http://localhost:3000",
  },
  shopify: {
    url: SHOPIFY_URL,
    token: SHOPIFY_ACCES_TOKEN
  },
};

module.exports = {
  config: baseConfig,
};
const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = async (request, response) => {
  const { name } = request.body;

  if (!name) {
    return response.status(STATUS_CODE.BAD_REQUEST).send("Missing product name");
  }

  try {
    const product = await Product.findByName(name);
    if (!product) {
      return response.status(STATUS_CODE.NOT_FOUND).send("Product not found");
    }

    await Cart.add(product);
    return response.status(STATUS_CODE.OK).send("Product added");
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return response.status(STATUS_CODE.INTERNAL_SERVER_ERROR).send("Internal server error");
  }
};

exports.getProductsCount = async () => {
  return await Cart.getProductsQuantity();
};

const common = require("./common");

//Load input validation
const validateAddProductInput = require("../validation/product");

//Load Product model and product domain
const ProductModel = require("../models/ProductModel");
const Product = require("../domain/product");

const addProduct = async payload => {
  const { errors, isValid } = validateAddProductInput(payload);
  if (!isValid) {
    throw common.helper.wrapError(errors, 400);
  }

  let product = await ProductModel.getProductByProductId(payload.productid);

  if (product) {
    errors.productid = "productid already exists";
    throw common.helper.wrapError(errors, 400);
  }

  product = await ProductModel.getProductByName(payload.productName);
  if (product) {
    errors.productName = "productName already exists";
    throw common.helper.wrapError(errors, 400);
  }

  const newProduct = new Product(
    payload.productid,
    payload.productName,
    payload.productPrice,
    payload.qnty
  );

  var result = await ProductModel.save(newProduct);
  newProduct.id = result.id;

  return newProduct;
};

const getProducts = async () => {
  const products = await ProductModel.getProductList();

  if (products.length == 0) {
    let errors = {};
    errors.name = "There are no products found!";
    throw common.helper.wrapError(errors, 404);
  }

  return products;
};

const deleteProduct = async id => {
  const product = await ProductModel.getProductById(id);
  if (!product) {
    let errors = {};
    errors.name = "Product can not found";
    throw common.helper.wrapError(errors, 404);
  }

  await ProductModel.deleteById(id);

  return id;
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct
};

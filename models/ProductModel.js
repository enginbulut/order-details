require("../dataaccess/mongo");
const Product = require("../domain/product");
const mongoose = require("mongoose");
const { save, convertToModels } = require("../dataaccess/mongohelper");

const Schema = mongoose.Schema;

//Create Schema
const ProductSchema = new Schema({
  productid: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  qnty: {
    type: Number,
    required: true
  }
});

//0 - guest user
//1 - admin
const ProductModel = mongoose.model("products", ProductSchema, "products");

const convertToModel = (product = new Product()) => {
  let model = new ProductModel();
  model.productid = product.productid;
  model.productName = product.productName;
  model.productPrice = product.productPrice;
  model.qnty = product.qnty;
  model._doc._id = mongoose.Types.ObjectId(product.id);

  return model;
};

const convertToDomain = (productModel = new ProductModel()) => {
  return productModel
    ? new Product(
        productModel.productid,
        productModel.productName,
        productModel.productPrice,
        productModel.qnty,
        productModel.id
      )
    : undefined;
};

const productSelector = product => {
  return {
    _id: product.id
  };
};

const getProductByName = async productName => {
  const productModel = await ProductModel.findOne({ productName });
  return convertToDomain(productModel);
};

const getProductByProductId = async productid => {
  const productModel = await ProductModel.findOne({ productid });
  return convertToDomain(productModel);
};

const getProductById = async id => {
  const productModel = await ProductModel.findById(id);
  return convertToDomain(productModel);
};

const getProductList = async () => {
  const productModels = await ProductModel.find({});

  return productModels.length > 0
    ? productModels.map(productModel => convertToDomain(productModel))
    : [];
};

const deleteById = async id => {
  await ProductModel.findByIdAndDelete(id);
};

module.exports = {
  save: save(ProductModel, convertToModels(convertToModel), productSelector),
  getProductByName,
  getProductById,
  getProductByProductId,
  getProductList,
  deleteById,
  getProductByProductId
};

const router = new (require("restify-router")).Router();
const common = require("../../service/common");
const utils = require("../../service/utils");

//Load Services
const productService = require("../../service/product");

common.api.public.get(router, "/list", async function(req) {
  const products = await productService.getProducts();
  return products;
});

common.api.private.post(router, "/add", utils.RoleType.Admin, async function(
  req
) {
  const newProduct = await productService.addProduct(req.body);
  return newProduct;
});

common.api.private.delete(
  router,
  "/delete/:id",
  utils.RoleType.Admin,
  async function(req) {
    await productService.deleteProduct(req.params.id);
    return req.params.id;
  }
);

module.exports = router;

import exprees from 'express';
import { deleteProduct, getOneProduct, getlistproduct, listProduct, userListProduct } from '../Controller/Product.controller.js';
import { veryfiyToken } from '../Middleware/jwt.auth.js';

const productListRoute = exprees.Router();

productListRoute.post("/listproduct", veryfiyToken ,listProduct)
productListRoute.get("/listproduct", getlistproduct)
productListRoute.get("/listproduct/:id", veryfiyToken , userListProduct)
productListRoute.delete("/listproduct/delete/:id", deleteProduct)
productListRoute.get("/productlist/:id", getOneProduct)


export default productListRoute;
import exprees from 'express';
import { getlistproduct, listProduct, userListProduct } from '../Controller/Product.controller.js';
import { veryfiyToken } from '../Middleware/jwt.auth.js';

const productListRoute = exprees.Router();

productListRoute.post("/listproduct", veryfiyToken ,listProduct)
productListRoute.get("/listproduct", getlistproduct)
productListRoute.get("/listproduct/:id", veryfiyToken , userListProduct)


export default productListRoute;
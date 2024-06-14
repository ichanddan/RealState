import exprees from 'express';
import { getlistproduct, listProduct } from '../Controller/Product.controller.js';
import { veryfiyToken } from '../Middleware/jwt.auth.js';

const productListRoute = exprees.Router();

productListRoute.post("/listproduct", veryfiyToken ,listProduct)
productListRoute.get("/listproduct", getlistproduct)


export default productListRoute;
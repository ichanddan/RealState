import exprees from 'express';
import { listProduct } from '../Controller/Product.controller.js';
import { veryfiyToken } from '../Middleware/jwt.auth.js';

const productListRoute = exprees.Router();

productListRoute.post("/listproduct", veryfiyToken ,listProduct)


export default productListRoute;
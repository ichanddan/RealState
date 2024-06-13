import { ListProduct } from "../Models/ProductList.models.js";

const listProduct = async (req, res) =>{
    try {
      const { name, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, type, offer, imageUrls, userRef } = req.body;
      const newProduct = new ListProduct({ name, description, address, regularPrice, discountPrice, bathrooms, bedrooms, furnished, parking, type, offer, imageUrls, userRef });
      await newProduct.save();
      res.status(200).json({ success: true, message: "Product added successfully",data:newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "internal server problem" });
    }
}

export {listProduct}
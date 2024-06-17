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

const getlistproduct = async (req, res) =>{
  try {
    const productList = await ListProduct.find();
    res.status(200).json({ success: true, data: productList });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server problem" });
  }
}


const userListProduct = async (req, res) =>{
  const id = req.params.id;
  if (req.user.id!==id) {
    try {
      const userData = await ListProduct.find({userRef:id})
      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      res.status(500).json({ success: false, message:"internal server isuss" });  
    }
  }else{
    res.status(401).json({ success: false, message: "Unauthrization" });
  }
}

const deleteProduct = async (req, res) =>{
  const id = req.params.id
  try {
    await ListProduct.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}

export {listProduct, getlistproduct, userListProduct, deleteProduct}
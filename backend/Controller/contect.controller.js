import { Contectdeller } from "../Models/contect.models.js"

export const contect = async (req, res) => {
  try {
    const { name, email, phone, message,title,sellOrRent,price } = req.body;
    const contectData = new Contectdeller({ name, email, phone, message,title,sellOrRent,price });
    await contectData.save();
    res
      .status(200)
      .json({ success: true, message: "Data send seussec full", data:contectData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
import { User } from "../Models/User.models.js";
import bcrypt, { genSalt } from 'bcrypt'

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const gerateSalt = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password:gerateSalt });
    await user.save();
    res.status(201).json({ message: "User created successfully!" ,user});
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
    console.log(error)
  }
};

export {signup}
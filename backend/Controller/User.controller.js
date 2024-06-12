import { genToken } from "../Middleware/jwt.auth.js";
import { User } from "../Models/User.models.js";
import bcrypt, { genSalt, hash } from 'bcrypt'

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

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found"});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false,  message: "Invalid credentials"});
    }
    user.password =""
    const paylod = {
      id: user._id,
    }
    const token = genToken(paylod);
    res.cookie('access_token', token, { httpOnly: true }).status(200).json({ success: true,  message: "Login successfully",user})
  } catch (error) {
    res.status(500).json({  success: false,  error: error.message});
    console.log(error);
  }
};


const updateUser = async (req, res) => {
  try {
    if (req.user.id ==req.params.id) {
       res.status(403).json({success: false, message: "You can update only your own account"});
    }
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const id = req.params.id
    const updatedUser = await User.findByIdAndUpdate(id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res
      .status(200)
      .json({ success: true, message: "User updated", user: rest });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};


const deleteUser = async (req, res) => {
  const id = req.params.id
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};


export {signup, Login, updateUser, deleteUser}
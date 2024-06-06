import jwt from "jsonwebtoken";

const veryfiyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthrization",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(408).json({ error: "invelid token" });
  }
};

const genToken = (userData) => {
  return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: "1h" });
};


export { veryfiyToken, genToken };
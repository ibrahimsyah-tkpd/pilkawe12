import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, secret);
};

const decodeToken = async (token) => {
  return jwt.decode(token, secret);
};

const verifyToken = (token) => {
  try {
    jwt.verify(token, secret);
    return true
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default {
  generateToken,
  decodeToken,
  verifyToken,
};

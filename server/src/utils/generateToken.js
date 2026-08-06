import jwt from "jsonwebtoken";

const generateToken = (adminId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is required in environment variables");
  }

  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

export default generateToken;


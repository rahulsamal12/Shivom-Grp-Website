import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";
import { successResponse } from "../utils/apiResponse.js";

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422);
      throw new Error("Email and password are required");
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin || admin.status !== "active" || !(await admin.matchPassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    successResponse(res, "Login successful", {
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  successResponse(res, "Admin profile fetched", req.admin);
};

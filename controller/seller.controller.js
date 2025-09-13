// import jwt from "jsonwebtoken";
// // seller login :/api/seller/login
// export const sellerLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (
//       password === process.env.SELLER_PASSWORD &&
//       email === process.env.SELLER_EMAIL
//     ) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });
//       res.cookie("sellerToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });
//       return res
//         .status(200)
//         .json({ message: "Login successful", success: true });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials", success: false });
//     }
//   } catch (error) {
//     console.error("Error in sellerLogin:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // check seller auth  : /api/seller/is-auth
// export const checkAuth = async (req, res) => {
//   try {
//     res.status(200).json({
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in checkAuth:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
// // logout seller: /api/seller/logout
// export const sellerLogout = async (req, res) => {
//   try {
//     res.clearCookie("sellerToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
//     });
//     return res.status(200).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in logout:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// import jwt from "jsonwebtoken";

// // seller login : /api/seller/login
// export const sellerLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (
//       password === process.env.SELLER_PASSWORD &&
//       email === process.env.SELLER_EMAIL
//     ) {
//       const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//         expiresIn: "7d",
//       });
//       res.cookie("sellerToken", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });
//       return res
//         .status(200)
//         .json({ message: "Login successful", success: true });
//     } else {
//       return res
//         .status(400)
//         .json({ message: "Invalid credentials", success: false });
//     }
//   } catch (error) {
//     console.error("Error in sellerLogin:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // check seller auth : /api/seller/is-auth
// export const checkAuth = async (req, res) => {
//   try {
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error in checkAuth:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // logout seller : /api/seller/logout
// export const sellerLogout = async (req, res) => {
//   try {
//     // ✅ Clear cookie even if token is missing or expired
//     res.clearCookie("sellerToken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
//     });
//     return res.status(200).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in sellerLogout:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


// src/controller/seller.controller.js
import Seller from "../models/seller.model.js"; // your Seller model
import Product from "../models/product.model.js"; // your Product model
import jwt from "jsonwebtoken";

// ==================== ADD PRODUCT ====================
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const product = await Product.create({
      seller: req.seller._id,
      name,
      description,
      price,
      category,
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==================== LIST PRODUCTS ====================
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.seller._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==================== SELLER LOGIN ====================
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller || seller.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("sellerToken", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==================== AUTH CHECK MIDDLEWARE ====================
export const checkAuth = (req, res, next) => {
  try {
    const token =
      req.cookies?.sellerToken || req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ==================== SELLER LOGOUT ====================
export const sellerLogout = (req, res) => {
  res.clearCookie("sellerToken");
  res.status(200).json({ message: "Logout successful" });
};

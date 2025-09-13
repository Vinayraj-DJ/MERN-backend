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


import jwt from "jsonwebtoken";
import Product from "../models/Product.js"; // Make sure path is correct

// SELLER LOGIN
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Login successful", success: true });
    } else {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.error("Error in sellerLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CHECK AUTH
export const checkAuth = async (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LOGOUT SELLER
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
    return res.status(200).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Error in sellerLogout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ADD PRODUCT
export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice } = req.body;
    const files = req.files || []; // if using multer
    const product = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      image: files.map((f) => f.filename),
    });
    await product.save();
    res.status(201).json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// LIST PRODUCTS
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in listProducts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

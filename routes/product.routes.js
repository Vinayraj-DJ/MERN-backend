// import express from "express";

// import { authSeller } from "../middlewares/authSeller.js";
// import {
//   addProduct,
//   changeStock,
//   getProductById,
//   getProducts,
// } from "../controller/product.controller.js";
// import { upload } from "../config/multer.js";
// const router = express.Router();

// router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
// router.get("/list", getProducts);
// router.get("/id", getProductById);
// router.post("/stock", authSeller, changeStock);

// export default router;


// import express from "express";
// import { authSeller } from "../middlewares/authSeller.js";
// import {
//   addProduct,
//   changeStock,
//   getProductById,
//   getProducts,
//   deleteProduct, // ✅ import the delete controller
// } from "../controller/product.controller.js";
// import { upload } from "../config/multer.js";

// const router = express.Router();

// router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
// router.get("/list", getProducts);
// router.get("/id", getProductById);
// router.post("/stock", authSeller, changeStock);

// // ✅ New DELETE route
// router.delete("/:id", authSeller, deleteProduct);

// export default router;


import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts,
  deleteProduct, // ✅ import the delete controller
} from "../controller/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

// Add product (only seller)
router.post("/add-product", authSeller, upload.array("image", 4), addProduct);

// Get all products
router.get("/list", getProducts);

// ✅ Get product by ID (dynamic param)
router.get("/:id", getProductById);

// Update stock (only seller)
router.post("/stock", authSeller, changeStock);

// ✅ Delete product (only seller)
router.delete("/:id", authSeller, deleteProduct);

export default router;

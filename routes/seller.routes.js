// import express from "express";
// import {
//   checkAuth,
//   sellerLogin,
//   sellerLogout,
// } from "../controller/seller.controller.js";
// import { authSeller } from "../middlewares/authSeller.js";
// const router = express.Router();

// router.post("/login", sellerLogin);
// router.get("/is-auth", authSeller, checkAuth);
// router.get("/logout", authSeller, sellerLogout);

// export default router;


// import express from "express";
// import { checkAuth, sellerLogin, sellerLogout } from "../controller/seller.controller.js";
// import { authSeller } from "../middlewares/authSeller.js";

// const router = express.Router();

// // Login
// router.post("/login", sellerLogin);

// // Check auth
// router.get("/is-auth", authSeller, checkAuth);

// // Logout (no auth middleware)
// router.post("/logout",authSeller, sellerLogout);

// export default router;


import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import { addProduct, listProducts } from "../controllers/seller.controller.js";

const router = express.Router();

router.post("/add-product", authSeller, addProduct);
router.get("/list-products", authSeller, listProducts);

export default router;

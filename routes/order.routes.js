// // import express from "express";
// // import authUser from "../middlewares/authUser.js";
// // import {
// //   getAllOrders,
// //   getUserOrders,
// //   placeOrderCOD,
// // } from "../controller/order.controller.js";
// // import { authSeller } from "../middlewares/authSeller.js";

// // const router = express.Router();
// // router.post("/cod", authUser, placeOrderCOD);
// // router.get("/user", authUser, getUserOrders);
// // router.get("/seller", authSeller, getAllOrders);

// // export default router;


// import express from "express";
// import authUser from "../middlewares/authUser.js";
// import { authSeller } from "../middlewares/authSeller.js";
// import {
//   getAllOrders,
//   getUserOrders,
//   placeOrderCOD,
//   cancelOrder, // ✅ Import cancelOrder controller
// } from "../controller/order.controller.js";

// const router = express.Router();

// // Place order (COD)
// router.post("/cod", authUser, placeOrderCOD);

// // Get logged-in user's orders
// router.get("/user", authUser, getUserOrders);

// // Get all seller orders
// router.get("/seller", authSeller, getAllOrders);

// // Cancel order by user
// router.put("/cancel/:orderId", authUser, cancelOrder); // ✅ New route

// export default router;


import express from "express";
import authUser from "../middlewares/authUser.js";
import { authSeller } from "../middlewares/authSeller.js";
import {
  getUserOrders,
  getSellerOrders, // ✅ use this for seller
  placeOrderCOD,
  cancelOrder,
} from "../controller/order.controller.js";

const router = express.Router();

// Place order (COD) by user
router.post("/cod", authUser, placeOrderCOD);

// Get logged-in user's orders
router.get("/user", authUser, getUserOrders);

// Get logged-in seller's orders
router.get("/seller", authSeller, getSellerOrders); // ✅ Corrected

// Cancel order by user
router.put("/cancel/:orderId", authUser, cancelOrder);

export default router;

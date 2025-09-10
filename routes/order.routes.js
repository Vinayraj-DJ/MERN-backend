// import express from "express";
// import authUser from "../middlewares/authUser.js";
// import {
//   getAllOrders,
//   getUserOrders,
//   placeOrderCOD,
// } from "../controller/order.controller.js";
// import { authSeller } from "../middlewares/authSeller.js";

// const router = express.Router();
// router.post("/cod", authUser, placeOrderCOD);
// router.get("/user", authUser, getUserOrders);
// router.get("/seller", authSeller, getAllOrders);

// export default router;


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
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  cancelOrder,
} from "../controller/order.controller.js";

const router = express.Router();

// User routes
router.post("/cod", authUser, placeOrderCOD);
router.get("/user", authUser, getUserOrders);
router.put("/cancel/:orderId", authUser, cancelOrder);

// Seller routes
router.get("/seller", authSeller, getAllOrders);
router.delete("/cancel/:orderId", authSeller, cancelOrder);

export default router;

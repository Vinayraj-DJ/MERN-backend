// // import Order from "../models/order.model.js";
// // import Product from "../models/product.model.js";

// // // Place order COD: /api/order/place
// // export const placeOrderCOD = async (req, res) => {
// //   try {
// //     const userId = req.user;
// //     const { items, address } = req.body;
// //     if (!address || !items || items.length === 0) {
// //       return res
// //         .status(400)
// //         .json({ message: "Invalid order details", success: false });
// //     }
// //     // calculate amount using items;
// //     let amount = await items.reduce(async (acc, item) => {
// //       const product = await Product.findById(item.product);
// //       return (await acc) + product.offerPrice * item.quantity;
// //     }, 0);

// //     // Add tex charfe 2%
// //     amount += Math.floor((amount * 2) / 100);
// //     await Order.create({
// //       userId,
// //       items,
// //       address,
// //       amount,
// //       paymentType: "COD",
// //       isPaid: false,
// //     });
// //     res
// //       .status(201)
// //       .json({ message: "Order placed successfully", success: true });
// //   } catch (error) {
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // // oredr details for individual user :/api/order/user
// // export const getUserOrders = async (req, res) => {
// //   try {
// //     const userId = req.user;
// //     const orders = await Order.find({
// //       userId,
// //       $or: [{ paymentType: "COD" }, { isPaid: true }],
// //     })
// //       .populate("items.product address")
// //       .sort({ createdAt: -1 });
// //     res.status(200).json({ success: true, orders });
// //   } catch (error) {
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };

// // // get all orders for admin :/api/order/all
// // export const getAllOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({
// //       $or: [{ paymentType: "COD" }, { isPaid: true }],
// //     })
// //       .populate("items.product address")
// //       .sort({ createdAt: -1 });
// //     res.status(200).json({ success: true, orders });
// //   } catch (error) {
// //     res.status(500).json({ message: "Internal Server Error" });
// //   }
// // };


// import Order from "../models/order.model.js";
// import Product from "../models/product.model.js";

// // Place order COD: /api/order/cod
// export const placeOrderCOD = async (req, res) => {
//   try {
//     const userId = req.user;
//     const { items, address } = req.body;
//     if (!address || !items || items.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Invalid order details", success: false });
//     }

//     // calculate amount using items
//     let amount = await items.reduce(async (acc, item) => {
//       const product = await Product.findById(item.product);
//       return (await acc) + product.offerPrice * item.quantity;
//     }, 0);

//     // Add tax charge 2%
//     amount += Math.floor((amount * 2) / 100);

//     await Order.create({
//       userId,
//       items,
//       address,
//       amount,
//       paymentType: "COD",
//       isPaid: false,
//     });

//     res
//       .status(201)
//       .json({ message: "Order placed successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Order details for individual user: /api/order/user
// export const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user;
//     const orders = await Order.find({
//       userId,
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     })
//       .populate("items.product address")
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Get all orders for admin: /api/order/seller
// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     })
//       .populate("items.product address")
//       .sort({ createdAt: -1 });
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Cancel order: /api/order/cancel/:orderId
// export const cancelOrder = async (req, res) => {
//   try {
//     const { orderId } = req.params;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     if (order.status === "Cancelled") {
//       return res.status(400).json({ success: false, message: "Order already cancelled" });
//     }

//     order.status = "Cancelled"; // update status
//     await order.save();

//     res.json({ success: true, message: "Order cancelled successfully", order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Place order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order details", success: false });
    }

    // calculate amount using items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add tax 2%
    amount += Math.floor((amount * 2) / 100);

    // Map items to include sellerId
    const itemsWithSeller = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        return {
          product: item.product,
          quantity: item.quantity,
          sellerId: product.sellerId, // ✅ assuming your Product model has sellerId
        };
      })
    );

    await Order.create({
      userId,
      items: itemsWithSeller,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    res.status(201).json({ message: "Order placed successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// User orders: /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Seller orders: /api/order/seller
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.seller._id;

    const orders = await Order.find({ "items.sellerId": sellerId })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Cancel order: /api/order/cancel/:orderId
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({ success: false, message: "Order already cancelled" });
    }

    order.status = "Cancelled";
    await order.save();

    res.json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

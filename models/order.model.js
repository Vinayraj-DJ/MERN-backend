// import mongoose from "mongoose";
// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: String, required: true, ref: "User" },
//     items: [
//       {
//         product: { type: String, required: true, ref: "Product" },
//         quantity: { type: Number, required: true },
//       },
//     ],
//     amount: { type: Number, required: true },
//     address: { type: String, required: true, ref: "Address" },
//     status: { type: String, default: "Order Placed" },
//     paymentType: { type: String, required: true },
//     isPaid: { type: Boolean, required: true, default: false },
//   },
//   { timestamps: true }
// );
// const Order = mongoose.model("Order", orderSchema);
// export default Order;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, required: true },
        sellerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Seller" }, // ✅ Add sellerId
      },
    ],
    amount: { type: Number, required: true },
    address: {
      firstName: String,
      lastName: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    status: { type: String, enum: ["Pending", "Cancelled", "Delivered"], default: "Pending" },
    paymentType: { type: String, required: true, enum: ["COD", "Online"] },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

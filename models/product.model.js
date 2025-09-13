// import mongoose from "mongoose";
// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: Array,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   offerPrice: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: Array,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   inStock: {
//     type: Boolean,
//     required: true,
//     default: true,
//   },
// });

// const Product = mongoose.model("Product", productSchema);
// export default Product;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: [String], default: [] }, // Array of image filenames
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;

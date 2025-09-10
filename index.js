// // import express from "express";
// // import cors from "cors";
// // import cookieParser from "cookie-parser";
// // import dotenv from "dotenv";
// // import { connectDB } from "./config/connectDB.js";
// // dotenv.config();
// // import userRoutes from "./routes/user.routes.js";
// // import sellerRoutes from "./routes/seller.routes.js";
// // import productRoutes from "./routes/product.routes.js";
// // import cartRoutes from "./routes/cart.routes.js";
// // import addressRoutes from "./routes/address.routes.js";
// // import orderRoutes from "./routes/order.routes.js";

// // import { connectCloudinary } from "./config/cloudinary.js";

// // const app = express();

// // await connectCloudinary();
// // // allow multiple origins
// // const allowedOrigins = ["http://localhost:5173"];
// // //middlewares
// // app.use(cors({ origin: allowedOrigins, credentials: true }));
// // app.use(cookieParser());
// // app.use(express.json());

// // // Api endpoints
// // app.use("/images", express.static("uploads"));
// // app.use("/api/user", userRoutes);
// // app.use("/api/seller", sellerRoutes);
// // app.use("/api/product", productRoutes);
// // app.use("/api/cart", cartRoutes);
// // app.use("/api/address", addressRoutes);
// // app.use("/api/order", orderRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   connectDB();
// //   console.log(`Server is running on port ${PORT}`);
// // });


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectDB.js";
// dotenv.config();

// import userRoutes from "./routes/user.routes.js";
// import sellerRoutes from "./routes/seller.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import addressRoutes from "./routes/address.routes.js";
// import orderRoutes from "./routes/order.routes.js";

// import { connectCloudinary } from "./config/cloudinary.js";

// const app = express();

// // Connect to Cloudinary
// await connectCloudinary();

// // Allowed origins for CORS
// const allowedOrigins = [
//   "http://localhost:5173", // local frontend
//   "https://mern-frontend-bn9qbrhhx-vinay-rajs-projects-b7e91a28.vercel.app", // deployed frontend
// ];

// // Middleware
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true, // allow cookies and auth headers
//   })
// );
// app.use(cookieParser());
// app.use(express.json());

// // API routes
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRoutes);
// app.use("/api/seller", sellerRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/address", addressRoutes);
// app.use("/api/order", orderRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });


import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";

// Import routes
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();

// Connect to Cloudinary
await connectCloudinary();

// Middleware
app.use(cookieParser());
app.use(express.json());

// API routes
app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

// Serve React frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));

// All other routes serve index.html (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

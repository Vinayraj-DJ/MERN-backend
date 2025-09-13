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

// await connectCloudinary();
// // allow multiple origins
// const allowedOrigins = ["http://localhost:5173"];
// //middlewares
// app.use(cors({ origin: allowedOrigins, credentials: true }));
// app.use(cookieParser());
// app.use(express.json());

// // Api endpoints
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRoutes);
// app.use("/api/seller", sellerRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/address", addressRoutes);
// app.use("/api/order", orderRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server is running on port ${PORT}`);
// });


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
//   "https://mern-frontend-ruddy-pi.vercel.app", // deployed frontend
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

// // Allowed origins
// const allowedOrigins = [
//   "http://localhost:5173", // local frontend
//   "https://mern-frontend-ruddy-pi.vercel.app", // your production frontend
// ];

// // ✅ Middleware
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (
//         !origin ||
//         allowedOrigins.includes(origin) ||
//         /\.vercel\.app$/.test(new URL(origin).hostname) // allow any vercel deploy
//       ) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
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
//   console.log(`✅ Server is running on port ${PORT}`);
// });


// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import dotenv from "dotenv";
// import { connectDB } from "./config/connectDB.js";
// import { connectCloudinary } from "./config/cloudinary.js";

// import userRoutes from "./routes/user.routes.js";
// import sellerRoutes from "./routes/seller.routes.js";
// import productRoutes from "./routes/product.routes.js";
// import cartRoutes from "./routes/cart.routes.js";
// import addressRoutes from "./routes/address.routes.js";
// import orderRoutes from "./routes/order.routes.js";

// dotenv.config();

// const app = express();

// // Allowed origins
// const allowedOrigins = [
//   "http://localhost:5173", // local frontend
//   "https://mern-frontend-ruddy-pi.vercel.app", // production frontend
// ];

// // ✅ Middleware
// app.use(express.json()); // parse JSON body
// app.use(cookieParser());  // parse cookies
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (
//         !origin ||
//         allowedOrigins.includes(origin) ||
//         (origin && /\.vercel\.app$/.test(new URL(origin).hostname))
//       ) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // allow cookies
//   })
// );

// // Static folder for images
// app.use("/images", express.static("uploads"));

// // API routes
// app.use("/api/user", userRoutes);
// app.use("/api/seller", sellerRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/address", addressRoutes);
// app.use("/api/order", orderRoutes);

// // Start server function
// const startServer = async () => {
//   try {
//     // Connect to DB first
//     await connectDB();
//     console.log("✅ Database connected");

//     // Connect to Cloudinary
//     await connectCloudinary();
//     console.log("✅ Cloudinary connected");

//     // Start server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`✅ Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Error starting server:", error.message);
//     process.exit(1);
//   }
// };

// // Start everything
// startServer();


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { connectCloudinary } from "./config/cloudinary.js";

import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-frontend-ruddy-pi.vercel.app"
];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use("/images", express.static("uploads"));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");
    await connectCloudinary();
    console.log("✅ Cloudinary connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();

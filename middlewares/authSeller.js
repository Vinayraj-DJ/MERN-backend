// import jwt from "jsonwebtoken";
// export const authSeller = async (req, res, next) => {
//   const { sellerToken } = req.cookies;
//   if (!sellerToken) {
//     return res.status(401).json({ message: "Unauthorized", success: false });
//   }
//   try {
//     const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
//     if (decoded.email === process.env.SELLER_EMAIL) {
//       return next();
//     } else {
//       return res.status(403).json({ message: "Forbidden", success: false });
//     }
//   } catch (error) {
//     console.error("Error in authSeller middleware:", error);
//     return res.status(401).json({ message: "Invalid token", success: false });
//   }
// };


// middlewares/authSeller.js
// import jwt from "jsonwebtoken";

// export const authSeller = (req, res, next) => {
//   try {
//     // ✅ Accept token from cookies OR Authorization header
//     const token =
//       req.cookies?.sellerToken || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized", success: false });
//     }

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // ✅ Optional: check if only ONE seller is allowed
//     if (process.env.SELLER_EMAIL && decoded.email !== process.env.SELLER_EMAIL) {
//       return res.status(403).json({ message: "Forbidden", success: false });
//     }

//     // Attach seller info to request (id, email, role, etc.)
//     req.seller = decoded;

//     next();
//   } catch (error) {
//     console.error("Error in authSeller middleware:", error);
//     return res.status(401).json({ message: "Invalid token", success: false });
//   }
// };


// import jwt from "jsonwebtoken";

// export const authSeller = (req, res, next) => {
//   try {
//     // ✅ Accept token from cookies OR Authorization header
//     const token =
//       req.cookies?.sellerToken || req.headers.authorization?.split(" ")[1];

//     console.log("Token:", token); // 🔹 Debug: check if token is received

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized", success: false });
//     }

//     // ✅ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("Decoded:", decoded); // 🔹 Debug: check decoded payload

//     // ✅ Optional: check if only ONE seller is allowed
//     if (process.env.SELLER_EMAIL && decoded.email !== process.env.SELLER_EMAIL) {
//       return res
//         .status(403)
//         .json({ message: "Forbidden", success: false });
//     }

//     // Attach seller info to request (id, email, role, etc.)
//     req.seller = decoded;

//     next();
//   } catch (error) {
//     console.error("Error in authSeller middleware:", error);
//     return res
//       .status(401)
//       .json({ message: "Invalid token", success: false });
//   }
// };


import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    // ✅ Accept token only from cookies
    const token = req.cookies?.sellerToken; // do NOT use localStorage on backend

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.seller = decoded; // attach seller info
    next();
  } catch (error) {
    console.error("Error in authSeller middleware:", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

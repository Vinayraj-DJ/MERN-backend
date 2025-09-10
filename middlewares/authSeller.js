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


import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const token = req.cookies.sellerToken;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Check email matches seller email
    if (decoded.email !== process.env.SELLER_EMAIL) {
      return res.status(403).json({ message: "Forbidden: Not a seller", success: false });
    }

    // Attach seller info to request
    req.seller = decoded;

    next();
  } catch (error) {
    console.error("Error in authSeller middleware:", error);

    // If token expired or invalid, clear cookie
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });

    return res.status(401).json({ message: "Invalid or expired token", success: false });
  }
};

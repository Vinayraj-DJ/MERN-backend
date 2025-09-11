// // import jwt from "jsonwebtoken";

// // const authUser = async (req, res, next) => {
// //   const { token } = req.cookies;
// //   if (!token) {
// //     return res.status(401).json({ message: "Unauthorized", success: false });
// //   }
// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded.id;
// //     next();
// //   } catch (error) {
// //     console.error("Error in authUser middleware:", error);
// //     return res.status(401).json({ message: "Invalid token", success: false });
// //   }
// // };

// // export default authUser;


// import jwt from "jsonwebtoken";

// const authUser = (req, res, next) => {
//   try {
//     const token = req.cookies.token; // ✅ safer than destructuring
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized", success: false });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.id; // ✅ store user id in request
//     next();
//   } catch (error) {
//     console.error("Error in authUser middleware:", error);
//     return res.status(401).json({ message: "Invalid token", success: false });
//   }
// };

// export default authUser;


// middleware/authUser.js
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    // ✅ Accept token from cookies or Authorization header
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user info (id, email, etc.) to req
    req.user = decoded;

    next();
  } catch (error) {
    console.error("Error in authUser middleware:", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authUser;

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authenticateToken = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Call your function to verify token and get uID
      const uID = await verifyTokenAndGetUserID(token);

      if (uID) {
        req.uID = uID;
        next();
      } else {
        // Failed login
        res.status(401).json({ success: false, message: "Invalid token" });
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Function to verify token and get uID
const verifyTokenAndGetUserID = async (providedToken) => {
  try {
    const decoded = jwt.verify(providedToken, process.env.JWT_SECRET, {
      clockTolerance: 60,
    });
    return decoded.uID;
  } catch (err) {
    // handle error
    console.error(`Error during token verification: ${err.message}`);
    return null;
  }
};

module.exports = { authenticateToken };

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // Check if the token is present in cookies
        const token = req.cookies.jwt;

        if (!token) {
            console.log("JWT Token missing");
            return res.status(401).json({ error: "Not authorized - No Token Provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Token expired, please log in again" });
            }
            console.error("JWT Verification Error:", error);
            return res.status(401).json({ error: "Not authorized - Invalid Token" });
        }

        // Define `user` as a constant and fetch user data
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User Not Found" });
        }

        req.user = user;  // Attach user to request object
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

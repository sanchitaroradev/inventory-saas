import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;

        // Check header exists
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "No authorized, no token",
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1]

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });
    }
}
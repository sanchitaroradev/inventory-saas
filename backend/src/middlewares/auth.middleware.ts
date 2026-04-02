import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppError } from "../utils/error";

export const protect = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const authHeader = req.headers.authorization;

        // Check header exists
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw new AppError("Not authorized, no token", 401);
        }

        // Extract token
        const token = authHeader.split(" ")[1]

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as {id: string};

        // Find user
        const user = await User.findById(decoded.id).select("-password");

        (req as any).user = user;

        next();
    }
    catch (error) {
        throw new AppError("Token invalid", 401);
    }
};
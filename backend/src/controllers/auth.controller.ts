import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { AppError } from "../utils/error";
import { registerschema, loginSchema } from "../validations/auth.validation";

// for registering user
export const registerUser = async (req: Request, res: Response) => {
    try{
        const validatedData = registerschema.parse(req.body);

        const existingUser = await User.findOne({email: validatedData.email});

        if (existingUser) {
            throw new AppError("Email already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(validatedData.password,10); 

        const user = await User.create({
            ...validatedData,
            password: hashedPassword,
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        })
    }
    catch (error) {
        throw error;
    }
}

// when user login
export const loginUser = async (req: Request, res: Response) => {
    try{
        const validatedData = loginSchema.parse(req.body);

        // Checking user exists
        const user = await User.findOne({email: validatedData.email});

        if(!user){
            throw new AppError("Invalid email or password", 400);
        }

        // Compare password
        const isMatch = await bcrypt.compare(validatedData.password,user.password);

        if(!isMatch) {
            throw new AppError("Invalid email or password", 400);
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d"}
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        throw error;
    }
};

export const getProfile = ( req:Request, res: Response) => {
    const user = (req as any).user;

    return res.status(200).json({
        success: true,
        data: user,
        message: "Profile fetched successfully",
    });
};

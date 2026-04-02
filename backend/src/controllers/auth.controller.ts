import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { AppError } from "../utils/error";

// for registering user
export const registerUser = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            throw new AppError("All fields are required",400);
        }
        const existingUser = await User.findOne({email});

        if (existingUser) {
            throw new AppError("Email already exists", 400);
        }
        const hashedPassword = await bcrypt.hash(password,10); 
        const user = await User.create({
            name,
            email,
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
        // return res.status(500).json({
        //     success: false,
        //     message: "Server error",
        // })
    }
}

// when user login
export const loginUser = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        // Validation
        if(!email || !password) {
            throw new AppError("Email and password are required", 400);
        }
        // Checking user exists
        const user = await User.findOne({email});

        if(!user){
            throw new AppError("Invalid email or password", 400);
        }

        // Compare password
        const isMatch = await bcrypt.compare(password,user.password);

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
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
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

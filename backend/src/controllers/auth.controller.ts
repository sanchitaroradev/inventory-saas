import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { success } from "zod";

// for registering user
export const registerUser = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            })
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
        return res.status(500).json({
            success: false,
            message: "Server error",
        })
    }
}

// when user login
export const loginUser = async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body;

        // Validation
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }
        // Checking user exists
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

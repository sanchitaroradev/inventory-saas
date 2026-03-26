import { Request, Response } from "express";
import { User } from "../models/User";
import { success } from "zod";

export const registerUser = async (req: Request, res: Response) => {
    try{
        const {name, email, password} = req.body
        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            })
        }
        const user = await User.create({
            name,
            email,
            password,
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
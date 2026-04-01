import { Request, Response } from "express";
import { Product } from "../models/Product";

export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, stock } = req.body;

        // validation
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: "Name and price are required",
            });
        }
        // Logged-in user
        const user = (req as any).user;

        const product = await Product.create({
            name,
            price,
            stock,
            createdBy: user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getProducts = async ( req: Request, res: Response) => {
    try{
        const user = (req as any).user;

        const products = await Product.find({
            createdBy: user._id,
        }).select("name price stock _id") 

        return res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const updateProduct = async ( req: Request, res: Response ) => {
    try {
        const {id} = req.params;
        const user = (req as any).user

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found", 
            });
        }

        if (product.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Product updated",
            data: updatedProduct,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = (req as any).user;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        if (product.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
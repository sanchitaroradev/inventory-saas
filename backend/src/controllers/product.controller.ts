import { Request, Response } from "express";
import { Product } from "../models/Product";
import { AppError } from "../utils/error";
export const addProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, stock } = req.body;

        // validation
        if (!name || price <= 0) {
            throw new AppError("Invalid product data", 400);
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
            message: "Products fetched successfully",
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
            throw new AppError("Product not found",404);
        }

        if (product.createdBy.toString() !== user._id.toString()) {
            throw new AppError("Not authorized", 403);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
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
            throw new AppError("Product not found", 404);
        }
        if (product.createdBy.toString() !== user._id.toString()) {
            throw new AppError("Not authorized", 403);
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
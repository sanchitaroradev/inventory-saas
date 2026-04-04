import { Request, Response } from "express";
import { Product } from "../models/Product";
import { AppError } from "../utils/error";
import { productschema } from "../validations/product.validation";

export const addProduct = async (req: Request, res: Response) => {
    try {
        const validatedData = productschema.parse(req.body);

        // Logged-in user
        const user = (req as any).user;

        const product = await Product.create({
            ...validatedData,
            createdBy: user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Product added successfully",
            data: product,
        });
    } catch (error) {
        throw error;
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
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
        throw error;
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = (req as any).user

        const product = await Product.findById(id);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        if (product.createdBy.toString() !== user._id.toString()) {
            throw new AppError("Not authorized", 403);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
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
        throw error;
    }
};
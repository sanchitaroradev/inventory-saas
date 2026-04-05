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

        return res.status(201).json({
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
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page-1)*limit;

        const products = await Product.find({
            createdBy: user._id,
        })
        .select("name price stock _id")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

        const total = await Product.countDocuments({
            createdBy: user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: {
                total,
                page,
                limit,
                products,
            },
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
            data: null,
        });
    } catch (error) {
        throw error;
    }
};
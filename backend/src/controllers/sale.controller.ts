import { Request, Response } from "express";
import { Sale } from "../models/Sale";
import { Product } from "../models/Product";
import { AppError } from "../utils/error";

export const createSale = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        const user = (req as any).user;

        // validation
        if (!productId || quantity <= 0) {
            throw new AppError("Invalid sale data", 400);
        }
        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        // ownership check
        if (product.createdBy.toString() !== user._id.toString()) {
            throw new AppError("Not authorized", 403);
        }

        // stock check 
        if (product.stock < quantity) {
            throw new AppError("Not enough stock", 400);
        }

        // calculate total
        const totalAmount = product.price * quantity;

        // reduce stock
        product.stock -= quantity;
        await product.save();

        // create sale
        const sale = await Sale.create({
            productId,
            quantity,
            totalAmount,
            createdBy: user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Sale completed successfully",
            data: sale,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getMySales = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const sales = await Sale.find({
            createdBy: user._id,
        }).populate("productId", "name price");

        return res.status(200).json({
            success: true,
            count: sales.length,
            data: sales,
            message: "Sales history fetched successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const getDashboard = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;

        const sales = await Sale.find({
            createdBy: user._id,
        });

        // total revenue
        const totalRevenue = sales.reduce(
            (sum, sale) => sum + sale.totalAmount,
            0
        );

        // total products sold
        const totalSales = sales.length;
        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            data: {
                totalRevenue,
                totalSales,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
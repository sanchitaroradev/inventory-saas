import { Request, Response } from "express";
import { Sale } from "../models/Sale";
import { Product } from "../models/Product";
import { AppError } from "../utils/error";
import { saleSchema } from "../validations/sale.validation";

export const createSale = async (req: Request, res: Response) => {
    try {
        const user = (req as any).user;
        const validatedData = saleSchema.parse(req.body);

        // Find product
        const product = await Product.findById(validatedData.productId);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        // ownership check
        if (product.createdBy.toString() !== user._id.toString()) {
            throw new AppError("Not authorized", 403);
        }

        // stock check 
        if (product.stock < validatedData.quantity) {
            throw new AppError("Not enough stock", 400);
        }

        // calculate total
        const totalAmount = product.price * validatedData.quantity;

        // reduce stock
        product.stock -= validatedData.quantity;
        await product.save();

        // create sale
        const sale = await Sale.create({
            ...validatedData,
            totalAmount,
            createdBy: user._id,
        });

        return res.status(200).json({
            success: true,
            message: "Sale completed successfully",
            data: sale,
        });

    } catch (error) {
        throw error;
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
        throw error;
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
        throw error;
    }
};
import { Request, Response } from "express";
import { Sale } from "../models/Sale";
import { Product } from "../models/Product";

export const createSale = async (req: Request, res: Response) => {
    try {
        const { productId, quantity } = req.body;
        const user = (req as any).user;

        // validation
        if (!productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Product and quantity are required",
            });
        }
        // Find product
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // ownership check
        if (product.createdBy.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        // stock check 
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock",
            });
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
            message: "Sale completed",
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
            totalRevenue,
            totalSales,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });    
    }
};
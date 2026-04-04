import {z} from "zod";

export const productschema = z.object({
    name: z.string().min(1,"Product name is required"),

    price: z.number().positive("Price must be greater than 0"),
    
    stock: z.number().min(0,"Stock cannot be negative"),
})
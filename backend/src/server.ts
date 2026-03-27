import dotenv from "dotenv"
dotenv.config()
import  express  from "express";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.route"

const app = express();

app.use(express.json());
app.use("/api/auth",authRoutes);

const PORT = process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.json({
        message: "Server is running successfully"
    });
})

const startServer= async ()=>{
    await connectDB();

    app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
};

startServer();
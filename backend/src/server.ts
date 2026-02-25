import  express  from "express";

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.json({
        message: "Server is running successfully"
    })
})

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})
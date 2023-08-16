import express  from "express";
import cors from 'cors';
import route from "./routes/products_route.js";
import DB_connection from "./config/db.js";
const app=express();
DB_connection()

app.use(express.json());
app.listen(8000,()=>{
    console.log("Server is running on 8000");
    // res("sddsfsdsd");
    
});




app.use('/api', route)
import express  from "express";
import cors from 'cors';
import route from "./routes/products_route.js";
import DB_connection from "./config/db.js";
import cookieParser from 'cookie-parser';
import 'dotenv/config';
const app=express();
DB_connection()

app.use(express.json());
app.use(cookieParser())
app.listen(8000,()=>{
    console.log("Server is running on 8000");
    // res("sddsfsdsd");
    
});



app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
// app.use(cors({ credentials: true, origin: 'https://landingpage77.netlify.app' }));



app.use('/api', route)
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import route from "./routes/products_route.js";
import payment_router from "./routes/payment.js";
import DB_connection from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 8000;
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'https://arcanesole.netlify.app', 'http://192.168.252.1:3000'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: allowedOrigins }));

app.listen(PORT, async () => {
    try {
         DB_connection();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Database connection error:', error);
    }
});

app.use('/api', route);
app.use('/payment', payment_router);

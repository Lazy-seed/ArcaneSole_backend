import express, { Router } from 'express'
import { addProduct, getAllProcuts } from "../controllers/product_controller.js";



const route=Router()


//  shoes

route.post('/addProduct',addProduct)
route.get('/allProducts',getAllProcuts)




export default route;

import express, { Router } from 'express'
import { addProduct, getAllProcuts, getSingleShoe } from "../controllers/product_controller.js";
import { newUser ,Login, userInfo } from '../controllers/user_controller.js';
import { Auth } from '../middleware/auth.js';
import { newOrder,getOrders } from '../controllers/order_controller.js';



const route=Router()


//  shoes

route.post('/addProduct',addProduct)
route.get('/allProducts/:ctg',getAllProcuts)
route.get('/singleShoe/:id',getSingleShoe)


// order
route.post('/newOrder',Auth,newOrder)
route.get('/getOrders',Auth,getOrders)



// user
route.post('/newUser',newUser)
route.post('/login',Login)
route.get('/userInfo',Auth,userInfo)




export default route;

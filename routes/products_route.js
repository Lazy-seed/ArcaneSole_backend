import express, { Router } from 'express'
import { addProduct, getAllProcuts, getSingleShoe } from "../controllers/product_controller.js";
import { newUser ,Login, userInfo, Logout, updateUser } from '../controllers/user_controller.js';
import { Auth } from '../middleware/auth.js';
import { newOrder,getOrders } from '../controllers/order_controller.js';
import { addBag, delBag, getBag } from '../controllers/bag_controller.js';



const route=Router()


//  shoes

route.post('/addProduct',addProduct)
route.get('/allProducts/:ctg',getAllProcuts)
route.get('/singleShoe/:id',getSingleShoe)




// Bag
route.post('/addBag',Auth,addBag);
route.get('/getBag',Auth,getBag);
route.get('/delBag/:id',Auth,delBag);



// order
route.post('/newOrder',Auth,newOrder)
route.get('/getOrders',Auth,getOrders)



// user
route.post('/newUser',newUser)
route.post('/login',Login)
route.get('/userInfo',Auth,userInfo)
route.get('/Logout',Auth,Logout)
route.post('/updateUser',Auth,updateUser)




export default route;

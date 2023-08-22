import order_model from "../models/order_model.js";


export const newOrder = async (req, res) => {
    const {items,charge,total} = req.body;

    const userID=req.userID

    console.log(userID);
    const order=await order_model.create({items,charge,total,user_id:userID});

    res.status(200).json({
        success: true,
        msg: " order create",
        order
    })

}

//  see orders
export const getOrders = async (req, res) => {

    const userID=req.userID

    const order=await order_model.find({user_id:userID});

    res.status(200).json({
        success: true,
        msg: "all order ",
        order
    })

}

import order_model from "../models/order_model.js";


export const newOrder = async (req, res) => {
    const {items} = req.body;

    const userID=req.userID

    console.log(userID);
    const order=await order_model.create({items,user_id:userID});

    res.status(200).json({
        success: true,
        msg: " order create",
        order
    })

}
export const getOrders = async (req, res) => {

    const userID=req.userID

    const order=await order_model.find({user_id:userID});

    res.status(200).json({
        success: true,
        msg: "all order ",
        order
    })

}

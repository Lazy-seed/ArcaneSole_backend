import bag_model from "../models/bag_model.js";
import order_model from "../models/order_model.js";


export const newOrder = async (req, res) => {

    const userID = req.userID
    const address = req.body
    let total = 0;
    let charge = 495;
    let items = [];

    // bag items
    const bagItems = await bag_model.find({ user_id: userID });

    // price loop
    bagItems.forEach(item => {
        total += item.price;
        items.push(item);
    });
    // console.log(address);
    //    make order
    const order = await order_model.create({ items, charge, total,address, user_id: userID });

    res.status(200).json({
        success: true,
        msg: " order create",
        order
    })


    //  delete bag
     await bag_model.deleteMany({ user_id: userID });



}

//  see orders
export const getOrders = async (req, res) => {

    const userID = req.userID

    const order = await (await order_model.find({ user_id: userID })).reverse();

    res.status(200).json({
        success: true,
        msg: "all order ",
        order
    })

}

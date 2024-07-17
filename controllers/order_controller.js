import bag_model from "../models/bag_model.js";
import order_model from "../models/order_model.js";
import product_schema from "../models/product_model.js";


export const newOrder = async (req, res) => {

    const userID = req.userID
    const { address } = req.body
    const { orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body
    const { total } = req.body
    let charge = 495;

    // bag items
    const bagItems = await bag_model.find({ user_id: userID }).populate('product');
  // Transform bagItems to include full product details
  const itemsWithProductDetails = await Promise.all(bagItems.map(async (item) => {
    const product = await product_schema.findById(item.product);
    return {
        ...item._doc,
        product
    };
}));
    // console.log(address);
    //    make order
    const order = await order_model.create({ items : itemsWithProductDetails, charge, total : (total   / 100), address, user_id: userID, orderCreationId, razorpayPaymentId, razorpayOrderId, razorpaySignature });

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

    const order = (await order_model.find({ user_id: userID })).reverse();

    res.status(200).json({
        success: true,
        msg: "all order ",
        order
    })

}

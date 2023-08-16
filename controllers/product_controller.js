import product_model from "../models/product_model.js";


// create product
export const addProduct = async (req, res) => {

    const data =req.body
    const product = await product_model.create(data);
    res.status(200).json({
        success: true,
        msg: "shoe added",
        product
    })
}
// get all products
export const getAllProcuts = async (req, res) => {

    const products = await product_model.find();

    res.status(200).json({
        success: true,
        msg: "get all shoes",
        products
    })
}
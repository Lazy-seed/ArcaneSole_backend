import bag_model from "../models/bag_model.js";
import product_schema from "../models/product_model.js";




//  add item in bag
export const addBag = async (req, res) => {
    const { shoe_id, qty, size, } = req.body;
    const userID = req.userID

    const product = await product_schema.findOne({ _id: shoe_id })
    const exist = await bag_model.findOne({ shoe_id: shoe_id });

    if (exist) {
        const newQty = exist.qty + 1;
        const uptBag = await exist.updateOne({ qty: newQty })

        // console.log(res);
        res.status(200).json({
            success: true,
            msg: "item upt",
            uptBag
        })
    } else {

        const bagItem = await bag_model.create({
            product :shoe_id,
            qty,
            size,
            user_id: userID
        });


        if (bagItem) {
            res.status(200).json({
                success: true,
                msg: "item add to bag",
                bagItem
            })
        }
        else {
            res.status(200).json({
                success: false,
                msg: " xxxx item add to bag"
            })
        }
    }
}


// upt bag item 
export const uptBag = async (req, res) => {
    const { size, qty, pID } = req.body;
    const result = await bag_model.findOneAndUpdate({ _id: pID }, { $set: { size: size, qty: qty } }, { returnNewDocument: true });
    res.status(200).json({
        success: true,
        msg: "updt bag item",
        result
    })
}



// see bag
export const getBag = async (req, res) => {
    const userID = req.userID
    const bagItems = await bag_model.find({ user_id: userID }).populate("product");
    if (bagItems) {
        res.status(200).json({
            success: true,
            msg: "all bag itmes ",
            bagItems
        })
    }
    else {
        res.status(200).json({
            success: false,
            msg: " xxx   bag itmes ",
        })
    }
}

// see bag
export const getBagPrice = async (req, res) => {
    const userID = req.userID
    const bagItems = await bag_model.find({ user_id: userID }).populate('product');
    let totalPrice = 0
    bagItems.map((data) => {
        totalPrice += data.product.price * data.qty
    })
    if (bagItems) {
        res.status(200).json({
            success: true,
            msg: "total price",
            totalPrice
        })
    }
    else {
        res.status(200).json({
            success: false,
            msg: "fail total price",

        })
    }
}



// del bag
export const delBag = async (req, res) => {

    const { id } = req.params;

    const item = await bag_model.deleteOne({ _id: id });

    res.status(200).json({
        succes: true,
        msg: "item del"
    })



}

import mongoose from "mongoose";


const bag = new mongoose.Schema({

    user_id: {
        type: String,
        default: ""
    },

    shoe_id: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    img1: {
        type: String,
        default: ""
    },
    qty: {
        type: Number,
        default: 0
    },
    size: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "packing"
    }

})



const bag_model = mongoose.model("bag", bag);
export default bag_model;
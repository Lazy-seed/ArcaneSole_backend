import mongoose from "mongoose";


const bag = new mongoose.Schema({

    user_id: {
        type: String,
        default: ""
    },

    size: {
        type: String,
        default: ""
    },
    qty: {
        type: Number,
        default: 0
    },
    product: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "shoes"
    }

})



const bag_model = mongoose.model("bag", bag);
export default bag_model;
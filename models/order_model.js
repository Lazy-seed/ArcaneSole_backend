import mongoose from "mongoose";


const order = new mongoose.Schema({

    user_id: {
        type: String,
        default: ""
    },
    orderStatus:{
        type:String,
        default:"packing"
    },  
    items:
        [
        ],

    charge: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    address: {

        house: {
            type: String,
            default: ""
        },
        area: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        state: {
            type: String,
            default: ""
        },
        pincode: {
            type: Number,
            default: 0
        }
    },
    orderCreationId:
     { type: String },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    razorpaySignature: { type: String },
    orderDate: {
        type: Date,
        default: Date.now()
    }
})



const order_schema = mongoose.model("orders", order);
export default order_schema;
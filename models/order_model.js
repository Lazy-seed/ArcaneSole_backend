import mongoose from "mongoose";


const order = new mongoose.Schema({

    user_id: {
        type: String,
        default: ""
    },
    items:
        [
            {

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
                },
            }
        ],

    charge: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    addres: {

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
    }
})



const order_schema = mongoose.model("orders", order);
export default order_schema;
import mongoose from "mongoose";


const products = new mongoose.Schema({
    name:{
        type:String,
        default:""
    },
    img1:{
        type:String,
        default:""
    },
    img2:{
        type:String,
        default:""
    },
    img3:{
        type:String,
        default:""
    },
    img4:{
        type:String,
        default:""
    },
    price:{
        type:Number
    },
    category:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:""
    },
    color:{
        type:String,
        default:""
    },
    popular:{
        type:Number,
        default:0
    },
    viewed:{
        type:Number,
        default:0
    }
})

const product_schema =mongoose.model("shoes", products);
export default product_schema;

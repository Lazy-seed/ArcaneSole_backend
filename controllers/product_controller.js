import product_model from "../models/product_model.js";


// create product
export const addProduct = async (req, res) => {

    const data = req.body

    console.log(data);
    const product = await product_model.create(data);
    res.status(200).json({
        success: true,
        msg: "shoe added",
        product
    })
}



// get all products
export const getAllProcuts = async (req, res) => {

    const ctg = req.params.ctg;

    console.log(ctg);


    if (ctg == 'men' || ctg == 'women' || ctg == 'girl' || ctg == 'boy') {
        const products = await product_model.find({ category: ctg });
        res.status(200).json({
            success: true,
            msg: "get shoe" + ctg,
            products
        })
    } else {
        const products = await product_model.find();
        res.status(200).json({
            success: true,
            msg: "get all shoes",
            products
        })
    }

}


// single shoe


export const getSingleShoe = async (req, res) =>{

    const id=req.params.id;

    const data =await product_model.findById(id)

        res.status(200).json({
            success: true,
            msg: "single shoe",
            data
        })
}




// srch
// export const SearchSong = async (req, res) => {
//     const srch = req.params.srch.toLowerCase();

//     const result = await songSchema.find(
//         {
//             "$or": [
//                 { "playlist_name": { $regex: srch } },
//                 { "catg": { $regex: srch } },
//                 { "name": { $regex: srch } }
//             ]
//         }
//     )

//     if (result.length != 0) {
//         res.status(200).json({
//             success: true,
//             msg: "get catg songs",
//             result
//         })
//     } else {
//         res.status(200).json({
//             success: false,
//             msg: "fail to get catg songs",
//             result:''
            
//         })
//     }

// }

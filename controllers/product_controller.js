import product_model from "../models/product_model.js";


// create product
export const addProduct = async (req, res) => {

    const data = req.body

    // console.log(data);
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

    // console.log(ctg);


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

    const upt_viewed= await product_model.findByIdAndUpdate({_id:id},{$set:{viewed:data.viewed+1}})
        res.status(200).json({
            success: true,
            msg: "single shoe",
            data
        })
}




// srch
export const SearchShoe = async (req, res) => {
    const srch = req.params.srch


    try {
        
    
    const result = await product_model.find(
        {
            "$or": [
                { "name": { $regex: srch ,'$options' : 'i'} },
                { "category": { $regex: srch ,'$options' : 'i'}   },
                { "color": { $regex: srch ,'$options' : 'i'}   }
            ]
        }
    )

    if (result.length != 0) {
        res.status(200).json({
            success: true,
            msg: "get catg shoes",
            result
        })
    } else {
        res.status(200).json({
            success: false,
            msg: "fail to get catg shoe",
            result:''
            
        })
    }
} catch (error) {
        console.log(error);
}

}

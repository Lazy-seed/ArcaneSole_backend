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


export const getRandomProducts = async (req, res) => {
    try {
        const num = 9;
        const products = await product_model.aggregate([
            { $sample: { size: num } }
        ]);

        if (products.length > 0) {
            res.status(200).json({
                success: true,
                msg: `Get ${num} random shoes`,
                products
            });
        } else {
            res.status(404).json({
                success: false,
                msg: "No random shoes found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
}



// get all products
export const getAllProcuts = async (req, res) => {

    const ctg = req.params.ctg;
    const page = req.params.page;
    const perPage = 6;

    if (ctg == 'men' || ctg == 'women' || ctg == 'girl' || ctg == 'boy') {
        const products = await product_model.find({ category: ctg });
        res.status(200).json({
            success: true,
            msg: "get shoe" + ctg,
            products
        })
    } else {
        const products = await product_model.find().skip((page - 1) * perPage).limit(perPage);
        const allPro = await product_model.find()
        const proLen = allPro.length
        res.status(200).json({
            success: true,
            msg: "get all shoes",
            proLen,
            products
        })
    }

}


// single shoe


export const getSingleShoe = async (req, res) => {

    const id = req.params.id;

    const data = await product_model.findById(id)

    const upt_viewed = await product_model.findByIdAndUpdate({ _id: id }, { $set: { viewed: data.viewed + 1 } })
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
                    { "name": { $regex: srch, '$options': 'i' } },
                    { "category": { $regex: srch, '$options': 'i' } },
                    { "color": { $regex: srch, '$options': 'i' } }
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
                result: ''

            })
        }
    } catch (error) {
        console.log(error);
    }

}

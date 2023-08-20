import userSchema from "../models/user_model.js";
import jwt from "jsonwebtoken";



// new user
export const newUser = async (req, res) => {
    const data = req.body;
    const email = data.email;

    const isExist = await userSchema.findOne({ email })
    if (isExist) {
        return res.status(400).json({
            success: false,
            msg: "user exist",
        })
    }

    // create new user
    const result = await userSchema.create(data)

    if (result) {

        res.status(200).json({
            success: true,
            msg: "user added",
            result
        })
    }
    else {
        res.status(400).json({
            success: false,
            msg: "user not added",

        })
    }
}





// login
export const Login = async (req, res) => {
    const { email, password } = req.body
    const result = await userSchema.findOne({ email: email })

    if (result) {
        // const token =await  result.generateAuthToken()
        const JWT_KEY=process.env.JWT_KEY;

        const token = jwt.sign({ _id: result._id }, JWT_KEY);
        const tokenAdd = await userSchema.findByIdAndUpdate({ _id: result._id }, { $push: { tokens: { token: token } } })
        const updated_user = await tokenAdd.save();
        res.cookie("jwtoken", token, { expires: new Date(Date.now() + 100000000), httpOnly: true, })

        if (result.password === password) {
            
            res.status(200).json({
                success: true,
                msg: "logged in",
                updated_user,
                token: token
            })
        } else {
            res.status(200).json({
                success: false,
                msg: "invalid credentials",

            })
        }
    }
    else {
        res.status(400).json({
            success: false,
            msg: "user not exist",

        })
    }
}



// get user details


export const userInfo =async (req, res)=>{

    const userInfo = req.rootuser;  
    res.status(200).json({
        success: true,
        msg: "user info",
        userInfo
    }) 
    

}
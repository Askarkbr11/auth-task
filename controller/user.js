const UserSchema = require("../model/user")

exports.registerUser  = async(req,res)=>{
    try{
        const {name,email,phone,password,cPassword,qualification,city,state,country,role} = req.body;
        if(password!=cPassword) return res.status(500).json({message:"password is not matching"})
        else
        UserSchema.findOne({email},async(err,user)=>{
            if(user) return res.status(500).json({message:"User is already registered"})
            else
            {
                let payload = {name,email,phone,password,qualification,city,state,country,role}
               let user =  await UserSchema.create(payload);
              
            return res.status(200).json({message:"successfully registered",payload})
            }
        })
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

exports.login = async(req,res)=>{
    try {
        let {email,password} = req.body;
        let user =await UserSchema.findOne({email});
        if(!user) return res.status(404).json({message:"user not registeres"})
        if(password!=user.password) return res.status(404).json({message:"invalid password"})
        if(user.role=="user") return res.status(200).json({message:"user succesfully loggedi in"})
        if(user.role=="admin")
        {
            let users = await UserSchema.find({})
            return res.status(200).json({message:"admin succesfully loggedi in",users})
        }    
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

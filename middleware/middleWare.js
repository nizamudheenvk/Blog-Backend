const jwt = require('jsonwebtoken')

const jwtMiddleWare = (req,res,next)=>{
    console.log("inside jwtMiddleWare");
    
    // logic authorized user
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);
    if(token){
        // verify token
        try{
            const jwtResponse =jwt.verify(token,process.env.JWTPASSWORD)
         console.log(jwtResponse);
         req.userId=jwtResponse.userId
         next()
         
        }catch(err){
            res.status(401).json("Authorization failed ...please login")
        }
    }else{
        res.status(404).json("authorization failed token is missing")
    }
    

}
module.exports = jwtMiddleWare
const jwt = require('jsonwebtoken')
const JWT_TOKEN = 'harshsonitoken'


const fetchuser = (req,res,next) => {
    // we give give the req a token which will be Checked
    const token = req.header('auth-token')
    if(!token){
        res.status(401).json({error:"Please enter a Valid Token"})
    }
    try{
        const data = jwt.verify(token,JWT_TOKEN)
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error.message + " Some error Ocurred");
    }
}
module.exports = fetchuser;
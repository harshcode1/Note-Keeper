const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const JWT_TOKEN = 'harshsonitoken'

// router.get('/',(req,res)=>{
//     obj = {
//         Name: "Harsh Soni",
//         age: 21
//     }
//     const user = User(req.body)
//     user.save()
//     console.log(req.body)
//     res.json(obj)
// }) 

//-> diff. b/w get and post is that post method data is not visble in request it is not sent in url it is send in body
//=> Creating a USER
router.post('/createUser', [
    body('name', 'enter a Valid Name').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    obj = {
        Name: "Harsh Soni",
        age: 21
    }
    // const user = User(req.body)
    // user.save()
    // console.log(req.body)

    // if there are errors then return bad request errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ success, errors: result.array() });
    }

    // Now we will check if a user with the email exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a Email with same authenticity exists" })
        }

        //=> Let's use the Hash Functionalities and we will use the await functionalities because we will wait until we fetch the results
        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_TOKEN)
        // console.log(authtoken);
        success = true;

        // .then(user=>res.json(user)).catch(err=>{console.log(err)
        // res.json({error: 'please enter a Unique Value',message: err.message})});  
        res.json({ success, "authtoken": authtoken })
    } catch (error) {
        console.log(error.message);
        return res.status(400).send("Some Error ocurred")
    }
})


//=> here we will try to authenticate the user login details
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password').exists(),
], async (req, res) => {

    try {
        let success = false;
        // we will see if the credentials are valid
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).json({ success, errors: result.array() });
        }

        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please enter the correct Login Credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(500).json({ success, error: "Please enter the correct Login Credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_TOKEN)
        success = true;
        res.json({ success, "authtoken": authtoken });
    } catch (error) {
        console.log(error.message + "Some error Ocurred");
    }
})

//=> Here we will try to find the users details by asking for ID(not exactly but different things).....
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userID = req.user.id;
        let user = await User.findById(userID).select("-password");
        res.json(user)
    } catch (error) {
        console.log(error.message + "Some error Ocurred");
    }
})


module.exports = router
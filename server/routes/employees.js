const express = require('express')
const router = express.Router()
const User = require('../model/employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticate = require ("../middleware/checkAuth")

//For Get User And Pagination/Searchin/Sorting
router.get('/getUser/:pageNumber/:Request', async (req, res) => {
    try {
        const page = req.params.pageNumber
        const limit = 10        
        const Request = req.params.Request
        const aggregateQuery = []

        if (page) {
            aggregateQuery.push(
            { $skip: (page - 1) * limit },
            { $limit: limit })
        }
            
        if (Request === "asc" || Request === "dsc") {
            aggregateQuery.push(
                { $sort: {"name" : Request === "asc" ? 1 : -1}}
            )
        }
        else {
            const search = Request
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            {"name": RegExp("^" +search, "i")},
                            { "salary1": parseInt(search) },
                            { "salary2": parseInt(search) },
                            { "salary3": parseInt(search) }                            
                        ]
                    }
                }
            )
        }        
        const userData = await User.aggregate(aggregateQuery)
        res.send(userData)
    } catch (err) {
        res.send('Error' + err)
    }
})

// //For Register User
router.post('/signUp', async (req, res) => {
    const user = new User({
        name: req.body.name,
        profession: req.body.profession,
        phone: req.body.phone,
        salary1: req.body.salary1,
        salary2: req.body.salary2,
        salary3: req.body.salary3,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        token: req.body.token
    })
    try {
        const userData = await user.save()
        res.send(userData)
    } catch (err) {
        res.send("Error" + err)
        console.log(err);
    }
})

//For Login User
router.post('/signIn', async (req, res) => {
    try {
        let token;        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: "please field the data" });            
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            //Generate Token
            token = await userLogin.generateAuthToken();

            //Store the Token in Cookie
            res.cookie("jwtLogin", token, {
                expiresIn: new Date(Date.now() + 1 * 3600 * 1000),
                httpOnly: true
            })
            res.send(userLogin);
        } else {
            res.status(400).send({ error: "Invalid Credientials!"});
        }

    } catch (err) {
        console.log(err);
    }
})

//For Edit User
router.get('/editUser/:id', async (req, res) => {
    try {
        const userData = await User.findById(req.params.id)
        res.send(userData)
    } catch (err) {
        res.send('Error' + err)
    }
})

//For Update Edited User
router.put('/updateUser/:id', async (req, res) => {
    try {
        const employee = await User.findById(req.params.id)
        employee.name = req.body.name
        employee.profession = req.body.profession
        employee.phone = req.body.phone
        employee.salary1 = req.body.salary1
        employee.salary2 = req.body.salary2
        employee.salary3 = req.body.salary3
        employee.email = req.body.email
        employee.password = req.body.password
        employee.confirmpassword = req.body.confirmpassword

        const userData = await employee.save()
        res.send(userData)
    } catch (err) {
        res.send('Error' + err)
    }
})

//For Delete User
router.delete('/deleteUser/:id', async (req, res) => {
    try {
    res.clearCookie("jwtLogin")
    const userData = await User.findByIdAndDelete(req.params.id)
    res.json(userData)
    } catch (err) {
        res.send('Error' + err)
    }
})

//For Dashbord Authentication 
router.get('/dashbord',authenticate,(req, res) => {
    res.send(req.authenticateUser);
})

//For Logout User
router.get('/logout', authenticate, async (req, res) => {
    try {

        //Remove token from database
        req.authenticateUser.Token = req.authenticateUser.Token.filter((elem) => {
            return elem.token !== req.token
        })
        console.log(" req.authenticateUser.Token", req.authenticateUser.Token);

        //clear cookie
        res.clearCookie('jwtLogin');
        await req.authenticateUser.save();
        res.status(200).send("user Logout");
    }
    catch (err) {
        console.log('error');
        res.status(500).send(err);
    }
})

module.exports = router    
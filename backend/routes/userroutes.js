const {signupUser,loginUser}=require('../controllers/usercontroller') //controller function

const express=require('express')

const router=express.Router()

//login
router.post('/login',loginUser)

//signup
router.post('/signup',signupUser)

module.exports=router;
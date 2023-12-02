//entry file for the backend application
const express = require('express')
require('dotenv').config()
const mongoose=require('mongoose')

const workoutRoutes= require('./routes/workoutroutes.js')
const userRoutes= require('./routes/userroutes.js')

//express app
const app=express()


//middlewares
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


//routes
app.use('/api/workouts',workoutRoutes) //it basically grab all the routes and use it on app
app.use('/api/user',userRoutes)  
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log('listening on port which you have given ',process.env.PORT);
})})
.catch((err)=>{console.log(err)});




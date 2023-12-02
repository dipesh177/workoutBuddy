const workoutModels=require('../models/workoutmodel')
const { default: mongoose } = require('mongoose');
//get all workouts
const getWorkouts = async (req,res)=>{
    const user_id = req.user._id
    try{
        const workouts = await workoutModels.find({user_id}).sort({createdAt:-1});
        res.json(workouts);
    }catch(err){
        res.status(400).json({error:err.message});
    }
    
}
//get a single workout
const getWorkout = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"});
    }
    const workout = await workoutModels.findById(id);
    if(!workout){
        res.status(404).json({error:"No workout found"});
    }
    res.status(200).json(workout);
}

//create a new workout
const createWorkout = async (req,res)=>{
    const {title,reps,load} = req.body;
    let emptyFields = [];
    if(!title){
        emptyFields.push('title');
    }
    if(!reps){
        emptyFields.push('reps');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill all the fields',emptyFields});
    }
    try{
        const user_id = req.user._id
        const workout = await workoutModels.create({title,reps,load,user_id});
        res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}


//delete a workout
const deleteWorkout  = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"});
    }
    const workout  = await workoutModels.findOneAndDelete({_id:id});
    if(!workout){
        res.status(400).json({error:"No workout found to delete"});
    }
    res.status(200).json(workout);
}


//update a workout
const updateWorkout = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout"});
    }
    const workout = await workoutModels.findOneAndUpdate({_id:id},{
        ...req.body
    });
    if(!workout){
        res.status(400).json({error:"No workout found to update"});
    }
    res.status(200).json(workout);

}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};

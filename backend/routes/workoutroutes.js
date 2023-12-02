const express =require('express')
const {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} =require('../controllers/workoutcontrollers')
const requireAuth=require('../middleware/requireAuth')

const router=express.Router()

router.use(requireAuth) //require auth for all routes
//get all workouts
router.get('/',getWorkouts)

//get a single workouts
router.get('/:id',getWorkout)

//post a new workout
router.post('/',createWorkout)

//delete a workout
router.delete('/:id',deleteWorkout)

//update a workout
router.patch('/:id',updateWorkout)



module.exports=router
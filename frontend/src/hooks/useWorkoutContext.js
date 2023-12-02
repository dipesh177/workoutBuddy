import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

//hook
export const useWorkoutContext  = () =>{
    const context = useContext(WorkoutsContext);
    if(!context){
        throw Error('useWorkoutContext inside workoutContextProvider only ');
    }
    return context;
}
import axios from "axios";

import { HOME_SUCCESS, HOME_FAIL } from "./types";

//Get user's projects

 const homeSuccess =(payload) =>{
     return {
         type: HOME_SUCCESS,
         payload: payload
     }
 }

 const homeFaile = (payload) =>{
    return {
        type: HOME_FAIL,
        payload: payload
    }
 }

export const getProjects = () => async dispatch=> {
  try {
    const res = await axios.get("/api/v1/projects");
    console.log(res);
    if(res.data.success){
      dispatch({
        type:HOME_SUCCESS,
        payload: res.data.data
      });
    }
   else{
    dispatch(homeFaile(res.data.data));
   }
  } catch (err) {
    dispatch(homeFaile(err));
  }
    
};

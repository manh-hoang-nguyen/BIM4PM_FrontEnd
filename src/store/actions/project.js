import axios from "axios";
import { setAlert } from "./alert";
import {
  PROJECT_CREATED_SUCCESS,
  PROJECT_CREATED_FAIL,
  PROJECT_CREATED_START
} from "./types";

//create project
export const create = (name, description ) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, description });

  try {
    dispatch({
      type:PROJECT_CREATED_START
    })
    const res = await axios.post("/api/v1/projects", body, config);
    console.log(res);
    dispatch({
      type: PROJECT_CREATED_SUCCESS,
      payload: res.data.data
    });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATED_FAIL,
      payload: error
    });
  }
};

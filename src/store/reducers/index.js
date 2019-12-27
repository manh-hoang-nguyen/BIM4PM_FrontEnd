import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import home from "./home";
import project from './project'
export default combineReducers({
  home,
  alert,
  auth,
  project
});

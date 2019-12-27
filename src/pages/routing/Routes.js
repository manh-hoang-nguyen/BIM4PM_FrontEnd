import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'

import PrivateRoute from "../routing/PrivateRoute";
import NotFound from "../../components/layout/NotFound";
import Login from "../auth/Login/Login";
import Register from "../auth//Signup/Signup";
import Dashboard from "../dashboard/Dashboard";
import  Home  from "../Home/Home";
import Alert from "../../components/layout/Alert";
const Routes = () => {
  return (
    <section className="container"  style={{height: "100%", width:"100%"}}>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/home" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};


export default  Routes;

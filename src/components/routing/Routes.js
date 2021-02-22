import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Alert from "../common/Alert";
import Register3 from "../auth/Register3";
import Login from "../auth/Login";

import DashBoard from "../dashboard/DashBoard";
import PrivateRoute from "./PrivateRoute";
import ProfileForms from "../profile-forms/ProfileForms";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import  Profile  from "../profile/Profile";
const Routes = (props) => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register3}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/alert" component={Alert}></Route>
        <PrivateRoute exact path="/dashboard" component={DashBoard}></PrivateRoute>
      </Switch>
    </section>
  );
};

export default Routes;

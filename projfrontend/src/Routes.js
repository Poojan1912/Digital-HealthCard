import React from 'react'
import { Link, Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import HealthCard from './facility/HealthCard'
import UserRoute from './auth/helper/UserRoute'
import HospitalRoute from './auth/helper/HospitalRoute'
import HospitalUI from './facility/HospitalUI' 
import HospitalForm from './facility/HospitalForm'
import Report from './facility/Report'
import ReportHospital from './facility/ReportHospital'
import Index from './MainPage/Index'
import Error from './core/Error'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />                
                <UserRoute path="/user/healthcard" exact component={HealthCard} />
                <UserRoute path="/report/download/:id" exact component={Report}  />
                <HospitalRoute path="/hospital/download/:id" exact component={ReportHospital}  />
                <HospitalRoute path="/hospital/dashboard" exact component={HospitalUI} />
                <HospitalRoute path="/hospital/form" exact component={HospitalForm} />
                <Route path="/error" component={Error} />
                <Route path="/" exact component={Index} />
                <Redirect to="/error" />
            </Switch>
        </Router>
    )
}

export default Routes

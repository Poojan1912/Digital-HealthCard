import React from 'react'
import { isAuthenticated } from '.';
import {Route, Redirect} from 'react-router-dom'

const HospitalRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props=>
          isAuthenticated() && isAuthenticated().hospital.userRole === "Hospital" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

export default HospitalRoute
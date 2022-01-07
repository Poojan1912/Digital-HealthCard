import React from 'react'
import { isAuthenticated } from '.';
import {Route, Redirect} from 'react-router-dom'

const UserRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props=>
          isAuthenticated() && isAuthenticated().user.userRole === "User" ? (
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

export default UserRoute
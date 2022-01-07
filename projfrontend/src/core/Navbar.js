import React from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles.css'
import { Link, withRouter } from 'react-router-dom';
import { signout } from "../auth/helper";
import { isAuthenticated } from "../auth/helper";

const Navbar = ({ history }) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#03203C' }}>
        <ul className="navbar-nav" style={{ marginLeft: 20 }}>
          <FontAwesomeIcon
            className="text-white"
            pull="right"
            icon={faUser}
            size="2x"
          />
          <li className="nav-item" id="nav-margin-user">
            <h6 className="text-light nav-link">{isAuthenticated().user.firstName}</h6>
          </li>
          {/* <li className="nav-item">
            <Link to="/user/healthcard" style={currentTab(history, "/user/healthcard")} className="nav-link">
            HealthCard
              </Link>
          </li>
          <li className="nav-item">
            <Link style={currentTab(history, "/user/reports")} className="nav-link" to="/user/resports">Reports</Link>
          </li>
          <li className="nav-item">
            <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/resports">DashBoard</Link>
          </li> */}
          <li className="nav-item" style={{padding: 8, cursor: "pointer" ,marginLeft: 250}}>
            <span 
            className="text-white"            
              onClick={() => {
                signout(() => {
                  history.push("/signin");
                })
              }}>
              Signout</span>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default withRouter(Navbar);

import React, { useState } from "react";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import '../styles.css'
import { Link, withRouter } from 'react-router-dom';
import { signout } from "../auth/helper";
import { isAuthenticated } from "../auth/helper";
import { getUserByAadhar } from '../facility/helper/facilityapicall'

const Navbar = ({history}) => {  
  const [values, setValues] = useState({
    user: "",
    error: "",
    aadharNumber: ""
  })

  const { user, error, aadharNumber } = values;

  const onSearch = (event) => {
    event.preventDefault();
    getUserByAadhar(aadharNumber)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          console.log(data);
          setValues({ ...values, user: data });
          console.log(user);
        }
      });
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  }

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
          <li className="nav-item" style={{ marginRight: 1100 }}>
            <h6 className="text-light nav-link">{isAuthenticated().hospital.hospitalName}</h6>
          </li>
         
          <li className="nav-item" style={{ padding: 8, cursor: "pointer" }}>
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

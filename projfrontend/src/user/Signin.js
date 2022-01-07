import React, { useState } from "react";
import "../styles.css";
import "../sign.css";
import { Link, Redirect } from "react-router-dom";

import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Col,
  Jumbotron
} from "reactstrap";
import { signin, authenticate, isAuthenticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    didRedirect: false,
    userRole: "User",
  });

  const { email, password, error, didRedirect, userRole } = values;
  const { user, hospital } = isAuthenticated();

  const handleSelect = (name) => (event) => {
    setValues({ ...values, userRole: event.target.value });
  };

  const handleChange = (name) => (event) => {
    // ...values loads existing values
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.userRole === "User") {
        console.log(user);
        return <Redirect to="/user/healthcard" />
      }
      if (hospital && hospital.userRole === "Hospital") {
        return <Redirect to="/hospital/dashboard" />
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, password, userRole })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch();
  };

  const onSubmitHospital = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ email, password, userRole })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              userRole: "Hospital",
              didRedirect: true,
            });
          });
        }
      })
      .catch();
  };

  const errorMessage = () => {
    return (

      <div className="d-flex justify-content-center mt-3">
        <div className="text-left text-center" style={{ width: 300 }}>
          <div className="alert text-white" style={{ display: error ? "" : "none", backgroundColor: '#E21717', padding: 5 }}> {error} </div>
        </div>
      </div>

    )

  }

  const SignInForm = () => {
    return (
      <div>
        <Jumbotron className="bg-danger text-white">
          <h1 className="display-5  text-center">Digital HealthCard Login</h1>
          <p className="lead  text-center">Login to Access Health Card</p>
          <Link id="left-align" className="ml-2" style={{ marginLeft: 15 }} to ="/"><button  type="button" className="btn btn-outline-light">
              Home
            </button></Link>
          <hr className="my-2" />
          
        </Jumbotron>
       
        <Form id="form-main2" style={{ marginTop: 50 }}>         
          <FormGroup row className="mb-2">
            <Label for="exampleSelect" sm={3}>Login As</Label>
            <Col sm={9} style={{ padding: 6 }} className="d-flex justify-content-center">
              <select name="select" id="exampleSelect" onChange={handleSelect()} style={{ width: 200, height: 30 }} autoFocus>
                <option id="user">User</option>
                <option id="hospital">Hospital</option>
              </select>
            </Col>
          </FormGroup>
          {errorMessage()}
          {userRole === "User" && (
            <div>
              <FormGroup
                row
                className="mb-4 "
                style={{ marginTop: 15 }}
                id="center"
              >
                <Col sm={11}>
                  <Input
                    type="email"
                    onChange={handleChange("email")}
                    value={email}
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row style={{ marginBottom: 50 }} id="center">
                <Col sm={11}>
                  <Input
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                    name="password"
                    id="examplePassword"
                    placeholder="Enter Password"
                  />
                </Col>
              </FormGroup>
              <div id="center" style={{ marginBottom: 20 }}>
                <Button onClick={onSubmit} color="primary" size="md" style={{width: 200}}>
                  Log in
                </Button>{" "}
              </div>
              <hr />
              <div id="center">
                <p>Don't Have an account? </p>
              </div>
              <div id="center">
                <Link to="/signup"><Button type="button" color="success">Sign up</Button></Link>
              </div>

            </div>
          )}

          {userRole === "Hospital" && (
            <div>
              <FormGroup
                row
                className="mb-4 "
                style={{ marginTop: 15 }}
                id="center"
              >
                <Col sm={11}>
                  <Input
                    type="email"
                    onChange={handleChange("email")}
                    value={email}
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row style={{ marginBottom: 50 }} id="center">
                <Col sm={11}>
                  <Input
                    type="password"
                    onChange={handleChange("password")}
                    value={password}
                    name="password"
                    id="examplePassword"
                    placeholder="Enter Password"
                  />
                </Col>
              </FormGroup>
              <div id="center" style={{ marginBottom: 20 }}>
                <Button onClick={onSubmit} color="primary" size="md" style={{width: 200}}>
                  Log in
                </Button>{" "}
              </div>
              <hr />
              <div id="center">
                <p>Don't Have an account? </p>
              </div>
              <div id="center">
                <Link to="/signup"><Button type="button" color="success">Sign up</Button></Link>
              </div>
            </div>
          )}
        </Form>
      </div>
    );
  };

  return (
    <div>
      
      {SignInForm()}
      {performRedirect()}
    </div>
  );
};

export default Signin;

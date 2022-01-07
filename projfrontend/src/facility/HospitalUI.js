import React, { useState } from 'react'
import Navbar from "../core/Navbar_Hospital";
import { getAllUserFormsForHospital, getUserByAadhar } from './helper/facilityapicall';
import Moment from 'moment';
import { Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faPen } from '@fortawesome/free-solid-svg-icons'
import Main from './Main';
import { Jumbotron, Form } from "reactstrap";
import "../styles.css"
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
const HospitalUI = (props) => {
  const [values, setValues] = useState({
    aadharNumber: "",
    error: "",
    userId: "",
    healthTable: "",
    hospitalId: "",
    user: "",
    success: false,
    firstName: "",
    lastName: "",
    dateOfBirth: {},
    phoneNo: 0
  })
  const { hospital, token } = isAuthenticated();
  const { aadharNumber, error, userId, healthTable, hospitalId, firstName, lastName, phoneNo, dateOfBirth, success, user } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  }

  const errorMessage = () => {
    return (
      <div className="d-flex justify-content-center mt-2">
        <div className="text-left text-center" style={{ width: 400 }}>
          <div
            className="alert text-white"
            style={{ display: error ? "" : "none", backgroundColor: "#E21717" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onSearch = async (event) => {
    event.preventDefault();
    await getUserByAadhar(aadharNumber)
      .then(async (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, healthTable: "", success: false })
        } else {
          console.log(data);
          setValues({ ...values, userId: data._id, hospitalId: hospital._id, success: true })
          localStorage.setItem("userId", data._id);
          localStorage.setItem("firstName", data.firstName)
          localStorage.setItem("lastName", data.lastName)
          localStorage.setItem("phoneNo", data.mobileNumber)
          localStorage.setItem("dateOfBirth", data.dateOfBirth)
          await preload(data)
        }
      })
  }

  async function preload() {
    await getAllUserFormsForHospital(hospital._id, localStorage.getItem("userId"), token).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, healthTable: data, aadharNumber: "", success: true });
      }
    })
  }

  const healthCard = () => {
    return (
      <div className="mb-5">
        <p style={{ display: (healthTable.length === 0 && success) ? "" : 'none' }} className="text-center text-secondary">Nothing to show</p>

        {(localStorage.getItem("userId")) && <div> <div id="center">

          <Link to="/hospital/form" >
            <button type="button" className="btn mb-2 text-light" style={{ backgroundColor: '#207398' }}> <FontAwesomeIcon
              className="text-white"
              icon={faPen}
              size="1x" />  Fill Form </button>
          </Link>
        </div>
        </div>}
        {(healthTable.length !== 0) &&
          <div id="center" className="mb-4">
            <div className="card text-center" style={{ width: 300 }}>
              <div className="card-body border border-secondary">
                <h5 className="card-title mb-1">User Information</h5>
                <hr />
                <div>
                  <p className="mb-1">Name: {localStorage.getItem("firstName")} {localStorage.getItem("lastName")}</p>
                  <p className="mb-1">Date Of Birth: {Moment(localStorage.getItem("dateOfBirth")).format('DD-MM-YYYY')}</p>
                  <p className="mb-1">Phone Number: {localStorage.getItem("phoneNo")}</p>
                </div>
              </div>
            </div>
          </div>
        }
        {(healthTable.length !== 0) &&
          <div>
            <Table hover className="container table table-bordered">
              <thead className="text-light" style={{ backgroundColor: '#8e2de2' }}>
                <tr>
                  <th>No.</th>
                  <th>Hospital Name</th>
                  <th>Doctor Name</th>
                  <th>Diagnosis</th>
                  <th>Discharge Date</th>
                  <th>
                    Detailed Report  </th>
                </tr>
              </thead>
              <tbody>
                {healthTable &&
                  healthTable.map((table, index) => (
                    <tr key={index} value={table._id}>
                      <td>{index + 1}</td>
                      <td>{table.hospitalName}</td>
                      <td>{table.doctorName}</td>
                      <td>{table.disease}</td>
                      <td>{Moment(table.dischargeDate).format('DD-MM-YYYY')}</td>
                      <td><Link to={`/hospital/download/${table._id}`}><button className="btn btn-success">Download  <FontAwesomeIcon
                        className="text-white"
                        icon={faFilePdf}
                        size="1x" /></button></Link></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        }
      </div>
    )

  }
  return (
    <div>
      <Navbar />
      <Jumbotron className="bg-danger text-white text-center">
        <h1 className="display-3">Hospital Dashboard</h1>
        <p className="lead">Search for the users by their given Aadhar Number to get their past medical history.</p>
        <hr className="my-2" />
      </Jumbotron>
      <Form className="mb-5 container text-center" style={{ width: 500 }}>
        <Main aadharNumber={aadharNumber} handle={handleChange} />
        <div id="center">
          <button type="submit" onClick={onSearch} className="btn btn-primary">Search</button>
        </div>
      </Form>
      {errorMessage()}

      {healthCard()}
    </div>
  )
}


export default HospitalUI;

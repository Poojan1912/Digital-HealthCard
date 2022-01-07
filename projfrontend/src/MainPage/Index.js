import React from "react";
import { Link } from "react-router-dom";
const Index = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-danger py-3">
        <div className="container-fluid">
          <h4
            className=" text-white"
            style={{ marginRight: 920, marginBottom: 0, paddingLeft:20 }}
          >
            DigitalHealthCard
          </h4>
          <Link style={{ textDecoration: "none" }} to="/signin">
            <h5 className="text-white mb-0" style={{ fontSize: 20 }}>
              Sign in
            </h5>
          </Link>
          <Link to="/signup">
            {" "}
            <button type="button" className="btn btn-outline-light">
              Sign up
            </button>{" "}
          </Link>
        </div>
      </nav>
      <div className=" d-flex justify-content-center bg-white">
        <div className="container row">
          <div className="col-md-6  pt-5 ">
            <h1 style={{ fontWeight: "bolder", fontSize: 50 }}>
              One Place to Access all your Health Details
            </h1>
            <p className="lead" style={{ fontSize: 30 }}>
              A Place where Hospital and User can access medical details to
              enhance the medical treatment given at any hospital without having
              prior knowledge of users medical history.
            </p>
          </div>
          <div className="col-md-6">
            <img
              style={{ height: 600 }}
              src="https://thumbs.dreamstime.com/b/cardio-exercising-healthy-lifestyle-heart-disease-prevention-healthcare-cardiology-eating-workout-health-diagnostics-vector-175224867.jpg"
            />
          </div>
        </div>
      </div>
      <div className=" d-flex justify-content-center bg-primary text-white">
        <div className="container row">
          <div className="col-md-6 mt-5 py-5">
            <img
              style={{ height: 400, width: 350, borderRadius: 50 }}
              src="https://thumbs.dreamstime.com/b/diagnosis-card-patient-profile-prescription-case-history-card-isolated-medical-health-care-design-diagnosis-card-patient-104457764.jpg"
            />
          </div>
          <div className="col-md-6  pt-5 ">
            <h1 style={{ fontWeight: "bolder", fontSize: 50 }}>
              What Users can do?
            </h1>
            <p className="lead" style={{ fontSize: 30 }}>
            Users can share their Aadhar Card Number with hospital, through which hospitals can access their details which helps treat patients more efficiently. Removing all the unnecessary filing and paperwork, everything here is digitalised providing a centralised health card.
            </p>
          </div>
        </div>
      </div>
      <div className=" d-flex justify-content-center pb-5">
        <div className="container row">
         
          <div className="col-md-6  pt-5 ">
            <h1 style={{ fontWeight: "bolder", fontSize: 50 }}>
             What Hospitals Can do?
            </h1>
            <p className="lead" style={{ fontSize: 30 }}>
             With the help of Aadhar Card Number, Hospitals can access user's medical history for providing the best medical treatments and after treating patients a medical form can be filled by them to help user keep track of their medical history.
            </p>
          </div>
          <div className="col-md-6 mt-5 ">
            <img
            
              style={{ height: 400, width: 350, borderRadius: 50,marginLeft:125 }}
              src="https://thumbs.dreamstime.com/b/patient-report-in-medical-card-doctor-record-in-medic-form-document-profile-of-patient-on-paper-sheet-diagnosis-after-test-of-194372762.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

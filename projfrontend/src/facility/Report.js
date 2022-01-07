import React, { useState, useEffect } from 'react'
import '../styles.css'
import {
Jumbotron, Button
} from "reactstrap";
import { isAuthenticated } from "../auth/helper";
import { getAllUserForms } from './helper/facilityapicall';
import Moment from 'moment';
import {Link} from 'react-router-dom';


const Report = (props) => {
    const [values, setValues] = useState({
        error: "",
        health: ""
    })


    const { health, error } = values;
    const { user, token } = isAuthenticated();

    const preloadData = async () => {
        await getAllUserForms(user._id, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                console.log(data);
                console.log(props.match.params.id);
                const result = data.filter(report => report._id == props.match.params.id)
                setValues({ ...values, health: result });
            }
        })
    }

    useEffect(async () => {
        await preloadData()
    }, [])

    const pri = () => {
        window.print()
    }

    const main = () => {
        console.log();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '-' + mm + '-' + yyyy;
        return (
            <div className="container text-left border border-dark" style={{ fontFamily: 'Roboto' }}>
                <Jumbotron className="mt-2 text-white bg-danger pb-3">
                    <div>
                        <h1 className="display-5 text-white text-center">DIGITAL HEALTHCARD</h1>
                        <h4 className="text-center">MEDICAL REPORT</h4>
                        <h5 className="lead text-center">A Detailed Report of your check-up.</h5>
                    </div>
                </Jumbotron>
                <hr className="my-2 mb-5 mt-0" />
                {health && health.map((table, index) => (
                    <div key={index} value={index}>
                        <div className="py-3 bg-info">
                            <h3> <i>Date: {today}</i> </h3>
                            <h2 className="text-center">{table.hospitalName}</h2>
                        </div>
                        <div className="mt-3">
                            <h4><b>Patient Name:</b> Mr./Mrs. {user.firstName} {user.lastName}  </h4>
                            <h4> <b>Doctor Name:</b> Dr. {table.doctorName}</h4> <br />
                            <h4> <b>Disease:</b> {table.disease}</h4>
                            <h4> <b>The Symptoms include:</b>  {table.symptoms}</h4><br />
                            <h4><b>Medical Treatment Given:</b> {table.medicine} </h4> <br />
                            <h4><b>Discharged on:</b> {Moment(table.dischargeDate).format('DD-MM-YYYY')}</h4>
                        </div>
                    </div>
                ))
                }


            </div>
        )
    }

    return (
        <div>
            {main()}
            <div id="center" className="my-5">
                <Button type="button" onClick={pri} className="noprint" style={{ marginRight: 23 }} color="primary">Download</Button>
                <Link to="/user/healthcard"><Button className="noprint" type="button" color="success">Go Back</Button></Link>
            </div>
        </div>
    )
}

export default Report

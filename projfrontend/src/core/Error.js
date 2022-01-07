import React from 'react'
import { Container, Button } from 'reactstrap'
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div>
            <Container className="h-100 mh-100" style={{marginTop: 200}}>
                <div className="row py-5">
                    <div className="col-sm-12 col-md-6 offset-md-3 text-center">
                        <h1 className="text-danger">404 Page not found</h1>
                        <h5>The Page you are trying to access does not exist. Please Go to Main Page</h5>
                        <Link to="/"><Button color="success">Home Page</Button>{' '}</Link>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Error

import React from 'react';
import { Spinner } from 'react-bootstrap';


const spinner = () => {
    return (
        <div style={{paddingLeft: '500px'}}>
        <Spinner animation="border" variant="success">
            <span className="sr-only">Loading, Please wait..</span>
        </Spinner>
        </div>
    )
}

export default spinner;
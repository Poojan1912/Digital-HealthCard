import React from 'react'

const Main = ({ handle, aadharNumber }) => {
    return (
        <div className="mb-2">
            <label className="form-label">Aadhar Number</label>
            <input type="name" value={aadharNumber} onChange={handle("aadharNumber")} className="form-control" id="aadharNumber" />
        </div>
    )
}

export default Main

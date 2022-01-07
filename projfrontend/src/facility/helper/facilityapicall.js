// user calls

export const getAllUserForms = async (userId, token) => {
    return await fetch(`http://localhost:8000/api/user/form/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const getAllUserFormsForHospital = async (hospitalId, userId, token) => {
    return await fetch(`http://localhost:8000/api/user/form/${hospitalId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const getHospitalById = async (hospitalId) => {
    return await fetch(`http://localhost:8000/api/hospital/${hospitalId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const fillData = (hospitalId, token, hospital) => {
    return fetch(`http://localhost:8000/api/hospital/form/${hospitalId}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(hospital)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getUserByAadhar = (aadharNumber) => {
    return fetch(`http://localhost:8000/api/user/aadhar`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ aadharNumber })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const getUser = (hospitalId, userId, token) => {
    return fetch(`http://localhost:8000/api/hospital/userData/${hospitalId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({userId})
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
}
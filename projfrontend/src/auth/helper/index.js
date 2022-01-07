import { API } from "../../backend";

export const signupUser = user => {    
    return fetch("http://localhost:8000/api/user/signup", {
        method: "POST",

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },        
        body: JSON.stringify(user)                
    })
        .then(response => {
            return response.json();
        })        
        .catch(err => console.log(err))
}

export const signupHospital = user => {    
    return fetch("http://localhost:8000/api/hospital/signup", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },        
        body: JSON.stringify(user)                
    })
        .then(response => {
            return response.json();
        })        
        .catch(err => console.log(err))
}

export const signin = user => {
    return fetch("http://localhost:8000/api/signin", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

export const signout = next => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userId");
    localStorage.removeItem("lastName");
    localStorage.removeItem("firstName");
    localStorage.removeItem("phoneNo");
    localStorage.removeItem("dateOfBirth");
    next();
    return fetch(`${API}/signout`, {
        method: "GET"
    })
        .then(response => console.log("Signout success"))
        .catch(err => console.log(err));
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}
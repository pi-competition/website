import { Divider, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Login from './admin/Login';
import ResetCars from './admin/ResetCars';

import "../admin.css"
import CarsStatus from './admin/CarsStatus';

const Admin = () => {
    let baseURL;
    const [token, setToken] = useState("");
    const [carData, setCarData] = useState();

    const currentURL = window.location.href
    const currentURLArray = currentURL.split(".")
    if (currentURLArray[0] === "https://staging") {
        baseURL = "https://papi-api-stg.ben-services.eu.org/api/"
    } else {
        baseURL = "https://papi-api.ben-services.eu.org/api/"
    }

    //checking if they are logged in already
    useEffect(() => {
        const savedToken = localStorage.getItem("admin-token")
        console.log(savedToken)
        const savedTime = localStorage.getItem("admin-time")
        if (savedToken !== null) {
            let currentTime = new Date().getTime() / 1000
            let savedTimeUnix = new Date(savedTime.substring(0, 10)).getTime() / 1000
            console.log("1")
            console.log(Math.floor(currentTime - savedTimeUnix))
            if (currentTime - savedTimeUnix > 604800) {
                console.log("2")
                localStorage.removeItem("admin-token")
                localStorage.removeItem("admin-time")
            }

            const data = {
                "password": savedToken
            }
            const url = baseURL + "verify"
            const fetchOptions = {
                method: "POST",
                mode: "cors",
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
            //post request
            fetch(url, fetchOptions).then((result) => {
                if (result.status === 204) {
                    console.log("3")
                    setToken(savedToken)
                }
            })
                .catch(() => {
                    console.log("Very bad error verifying the saved password")
                })

        }
    }, [])

    if (token === "") {
        return <Login setToken={setToken} />
    }

    const setCars = (carData) => {
        setCarData(carData)
    }

    const dividerStyleText = { "&::before, &::after": { borderColor: "#1565c0", }, }
    const dividerStyleNoText = { bgcolor: "#1565c0" }
    return (
        <div className='admin-div'>
            <Stack spacing={2}>
                <p className='text-4xl bold flex justify-center' id="admin-title">Admin</p>
                <Divider sx={dividerStyleText} className="admin-divider" m="1rem" >Car Information</Divider>
                {carData && <CarsStatus carsData={carData} />}
                <Divider sx={dividerStyleText} className="admin-divider" m="1rem" >Reset Cars</Divider>
                <ResetCars carsFunc={setCars} auth={token} />
                <Divider sx={dividerStyleNoText} className="admin-divider" m="1rem" />
            </Stack>
        </div>
    )
}

export default Admin
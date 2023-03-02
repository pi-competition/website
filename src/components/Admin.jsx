import { Divider, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Login from './admin/Login';
import ResetCars from './admin/ResetCars';
import "../admin.css"
import CarsStatus from './admin/CarsStatus';
import config from "../config/config.json"

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
        let savedUnix = Math.floor(localStorage.getItem("admin-unix"))
        //console.log(savedUnix)
        //console.log(config.adminLoginPersistDuration)
        if (savedToken !== null) {
            setToken("temp")
            let currentTime = Math.floor(new Date().getTime() / 1000)
            if (currentTime - savedUnix > config.adminLoginPersistDuration) {
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
                    setToken(savedToken)
                } else {
                    setToken("")
                }
            })
                .catch(() => {
                    console.log("Very bad error occured while verifying the saved password")
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
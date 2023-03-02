import { Divider, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react'
import ResetCars from './admin/ResetCars';
import "../admin.css"
import CarsStatus from './admin/CarsStatus';
import config from "../config/config.json"
import { Navigate, redirect } from 'react-router-dom';
import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';

const Admin = () => {
    let baseURL;
    const [token, setToken] = useState("temp");
    const [carData, setCarData] = useState();
    const [loading, setLoading] = useState(true);
    const [returnValue, setReturnValue] = useState();

    const currentURL = window.location.href
    const currentURLArray = currentURL.split(".")
    if (currentURLArray[0] === "https://staging") {
        baseURL = "https://papi-api-stg.ben-services.eu.org/api/"
    } else {
        baseURL = "https://papi-api.ben-services.eu.org/api/"
    }

    //checking if they are logged in already
    useEffect(() => {
        setTimeout(() => {
            console.log("checking")
            const savedToken = localStorage.getItem("admin-token")
            let savedUnix = Math.floor(localStorage.getItem("admin-unix"))
            if (savedToken !== null) {
                console.log("checking2")
                let currentTime = Math.floor(new Date().getTime() / 1000)
                if (currentTime - savedUnix > config.adminLoginPersistDuration) {
                    localStorage.removeItem("admin-token")
                    localStorage.removeItem("admin-time")
                    setReturnValue(false)
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
                        setLoading(false)
                        setReturnValue(true)
                    } else {
                        localStorage.removeItem("admin-token")
                        localStorage.removeItem("admin-time")
                    }
                })
                    .catch(() => {
                        console.log("Very bad error occured while verifying the saved password")
                    })

            } else {
                console.log("checking3")
                setReturnValue(false)
                setToken("")
            }
        }, 1000)
    }, [])



    if (returnValue === false && !token) {
        console.log(returnValue === false)
        console.log("redirecting")
        setTimeout(() => {
        }, 300)
        return (<Navigate replace to="/admin/login" />)
    }

    const setCars = (carData) => {
        setCarData(carData)
    }

    const dividerStyleText = { "&::before, &::after": { borderColor: "#1565c0", }, }
    const dividerStyleNoText = { bgcolor: "#1565c0" }
    if (loading) {
        return (
            <div></div>
        )
    } else {
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
}

export default Admin
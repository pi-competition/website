import { Divider, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import ResetCars from './admin/ResetCars';
import "../admin.css"
import CarsStatus from './admin/CarsStatus';
import config from "../config/config.json"
import { Navigate } from 'react-router-dom';
import RestartServer from './admin/RestartServer';
import RegenImage from './admin/RegenMap';


const Admin = () => {
    const baseURL = config.apiURL
    const [token, setToken] = useState("temp");
    const [carData, setCarData] = useState();
    const [loading, setLoading] = useState(true);
    const [returnValue, setReturnValue] = useState();

    //checking if they are logged in already
    useEffect(() => {
        setTimeout(() => {
            const savedToken = localStorage.getItem("admin-token")
            let savedUnix = Math.floor(localStorage.getItem("admin-unix"))
            if (savedToken !== null) {
                let currentTime = Math.floor(new Date().getTime() / 1000)
                if (currentTime - savedUnix > config.adminLoginPersistDuration) {
                    localStorage.removeItem("admin-token")
                    localStorage.removeItem("admin-time")
                    setReturnValue(false)
                }

                const data = {
                    "password": savedToken
                }
                const url = baseURL + "/api/verify"
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
                setReturnValue(false)
                setToken("")
            }
        }, 500)
    }, [])



    if (returnValue === false && !token && config.requirePasswordForAdmin === true) {
        console.log(returnValue === false)
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
            <div>Saved password is wrong or the controller is offline. Re-enter it <a href="/admin/login">here</a></div>
        )
    } else {
        return (
            <div className='admin-div'>
                <Stack spacing={2}>
                    <p className='text-6xl bold flex justify-center' id="admin-title">Admin</p>
                    <Divider sx={dividerStyleText} className="admin-divider" m="1rem" ><Typography variant="h5">Car Information</Typography></Divider>
                    {carData && <CarsStatus carsData={carData} />}
                    <Divider sx={dividerStyleText} className="admin-divider" m="1rem" ><Typography variant="h5">Reboot Cars</Typography></Divider>
                    <ResetCars carsFunc={setCars} auth={token} />
                    <Divider sx={dividerStyleText} className="admin-divider" m="1rem" ><Typography variant="h5">Restart Server</Typography></Divider>
                    <RestartServer auth={token} />
                    <Divider sx={dividerStyleText} className="admin-divider" m="1rem" ><Typography variant="h5">Refresh Image</Typography></Divider>
                    <RegenImage auth={token} />
                    <Divider sx={dividerStyleNoText} className="admin-divider" m="1rem" />
                </Stack>
            </div>
        )
    }
}

export default Admin
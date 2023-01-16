import { Divider, Stack } from '@mui/material';
import React, { useState } from 'react'
import Login from './admin/Login';
import ResetCars from './admin/ResetCars';
import config from "../config.json"

import "../admin.css"
import CarsStatus from './admin/CarsStatus';

const Admin = () => {
    let initToken;
    if (config.requirePasswordForAdmin) initToken = ""
    else initToken = "admin"
    const [token, setToken] = useState(initToken);
    const [carData, setCarData] = useState();

    if (!token) {
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
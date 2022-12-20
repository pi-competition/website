import { Divider, Stack } from '@mui/material';
import React, { useState } from 'react'
import Login from './admin/Login';
import ResetCars from './admin/ResetCars';

import "../admin.css"

const Admin = () => {
    const [token, setToken] = useState("");

    if (!token) {
        return <Login setToken={setToken} />
    }

    const dividerStyleText = { "&::before, &::after": { borderColor: "#1565c0", }, }
    const dividerStyleNoText = { bgcolor: "#1565c0" }
    return (
        <div className='admin-div'>
            <Stack spacing={2}>
                <Divider sx={dividerStyleText} className="admin-divider" m="1rem" >Reset Cars</Divider>
                <ResetCars />
                <Divider sx={dividerStyleNoText} className="admin-divider" m="1rem" ></Divider>
            </Stack>
        </div>
    )
}

export default Admin
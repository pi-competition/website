import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Login = ({ setToken }) => {
    const [userField, setUserField] = useState("");
    const [passField, setPassField] = useState("");
    const [user, setUser] = useState();
    const [pass, setPass] = useState();

    //useEffect(() => {
    //    console.log(userField)
    //}, [userField])

    //useEffect(() => {
    //    console.log(passField)
    //}, [passField])

    const setDetails = () => {
        setUser(userField)
        setPass(passField)
    }

    useEffect(() => {
        if (user === "owen" && pass === "jones") {
            setToken("ok")
        }
    }, [pass])

    return (
        <div className='flex justify-center items-center'>
            <Stack
                component="form"
                noValidate
                autoComplete='off'
                className="admin-input-stack"
                spacing={2}
            >
                <TextField
                    id="username-input"
                    label="Username"
                    variant='filled'
                    value={userField}
                    onChange={(newValue) => {
                        setUserField(newValue.target.value)
                    }}
                />
                <TextField
                    id="password-input"
                    label="Password"
                    type="password"
                    variant='filled'
                    value={passField}
                    onChange={(newValue) => {
                        setPassField(newValue.target.value)
                    }}
                />
                <Button
                    id="enter-login-button"
                    variant="contained"
                    onClick={setDetails}
                >
                    Enter
                </Button>
            </Stack>
        </div>
    )
}

export default Login
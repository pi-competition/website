import { Stack, Alert, AlertTitle, Collapse, IconButton, Button, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import React, { useEffect, useState } from 'react'
import config from "../../config.json"

const Login = ({ setToken }) => {
    let baseURL;
    const ALERT_DURATION = config.reset_cars_alert_duration
    const [userField, setUserField] = useState("");
    const [passField, setPassField] = useState("");
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [loginErrorTitle, setLoginErrorTitle] = useState("");

    //const [user, setUser] = useState("");
    //const [pass, setPass] = useState("");

    const currentURL = window.location.href
    const currentURLArray = currentURL.split(".")
    if (currentURLArray[0] === "https://pi-comp") {
        baseURL = "https://papi-api.ben-services.eu.org/api/"
    } else {
        baseURL = "https://papi-api-stg.ben-services.eu.org/api/"
    }

    const login = async () => {
        const username = userField
        const password = passField
        if (!username || !password) {
            return
        }
        const data = {
            "password": password
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
        const response = await fetch(url, fetchOptions)
            .catch(() => {
                setLoginErrorTitle("Error")
                setLoginErrorMessage("Verification request failed")
                setCollapseOpen(true)
            })
        if (response.status === 204) {
            setToken(username)
        } else if (response.status === 401 || response.status === 403) {
            const response_json = await response.json()
            setLoginErrorTitle(response_json.message)
            setLoginErrorMessage(response_json.error)
            setCollapseOpen(true)
        } else if (response.status === 503) {
            setLoginErrorTitle("Service Unavailable")
            setLoginErrorMessage("Ben moment")
            setCollapseOpen(true)
        }
        return response
    }

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
                    onClick={login}
                >
                    Enter
                </Button>
                <Collapse
                    in={collapseOpen}
                    addEndListener={() => {
                        setTimeout(() => {
                            setCollapseOpen(false)
                        }, ALERT_DURATION);
                    }}
                    className="login-collapse"
                >
                    <Alert
                        className='login-alert'
                        variant="filled"
                        severity={"error"}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setCollapseOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        <AlertTitle>{loginErrorTitle}</AlertTitle>
                        {loginErrorMessage}
                    </Alert>
                </Collapse>
            </Stack>
        </div>
    )
}

export default Login
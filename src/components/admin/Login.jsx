import { Stack, Alert, AlertTitle, Collapse, IconButton, Button, TextField } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import React, { useState } from 'react'
import config from "../../config.json"

const Login = ({ setToken }) => {
    let baseURL;
    const ALERT_DURATION = config.loginPageAlertDuration
    const [userField, setUserField] = useState("");
    const [passField, setPassField] = useState("");
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [loginErrorTitle, setLoginErrorTitle] = useState("");
    const [buttonState, setButtonState] = useState(false);

    //const [user, setUser] = useState("");
    //const [pass, setPass] = useState("");

    const currentURL = window.location.href
    const currentURLArray = currentURL.split(".")
    if (currentURLArray[0] === "https://staging") {
        baseURL = "https://papi-api-stg.ben-services.eu.org/api/"
    } else {
        baseURL = "https://papi-api.ben-services.eu.org/api/"
    }

    //baseURL = "https://papi-api.ben-services.eu.org/api/"

    const handleLoginError = (title, msg) => {
        setLoginErrorTitle(title)
        setLoginErrorMessage(msg)
        setCollapseOpen(true)
    }

    const login = async () => {
        setButtonState(true)
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
                handleLoginError("Error", "Verification request failed")
            })
        if (response.status === 204) {
            setToken(password)
        } else if (response.status === 401 || response.status === 403) {
            const response_json = await response.json()
            handleLoginError(response_json.message, response_json.error)
        } else if (response.status === 503) {
            handleLoginError("Service Unavailable", "An error occured on the server. Please try again later.")
        }
        localStorage.setItem("admin-token", password)
        localStorage.setItem("admin-unix", new Date().getTime() / 1000)
        return
    }

    const handleEnterPress = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            login()
        }
    }

    return (
        <div className='login-container flex justify-center items-center'>
            <div className='login-border'>
                <Stack
                    component="form"
                    noValidate
                    autoComplete='off'
                    className="admin-input-stack"
                    spacing={2}
                >
                    <h1 className='admin-login-label text-xl font-bold'>Admin Page Login</h1>
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
                        onKeyUp={handleEnterPress}
                        onChange={(newValue) => {
                            setPassField(newValue.target.value)
                        }}
                    />
                    <Button
                        id="enter-login-button"
                        variant="contained"
                        onClick={login}
                        disabled={buttonState}
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
        </div>
    )
}

export default Login
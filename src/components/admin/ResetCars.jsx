import React, { useEffect, useState } from 'react'
import { Alert, AlertTitle, Checkbox, Collapse, Grid, IconButton, Stack } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"

import config from "../../config/config.json"

const ResetCars = ({ carsFunc, auth }) => {
    let rawAPIData;
    const baseURL = config.apiURL
    const ALERT_DURATION = config.resetCarsAlertDuration
    const [cars, setCars] = useState([]);
    const [carData, setCarData] = useState();
    const [carsSelected, setCarsSelected] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState([])
    const [loading, setLoading] = useState(true);
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [resetCarsPostSuccess, setResetCarsPostSuccess] = useState(true);
    const [alertError, setAlertError] = useState("There was an error when reseting the cars");
    const [alertTitle, setAlertTitle] = useState("Error");
    const [errorMessage, setErrorMessage] = useState("")

    //baseURL = "https://papi-api.ben-services.eu.org/api/"

    const getCars = async () => {
        //get car data from api
        const url = baseURL + "cars/status"
        const fetchOptions = {
            method: "GET"
        }

        const carsArray = [];

        let result = await fetch(url, fetchOptions)
            .catch((err) => console.error(err))

        if (result.status !== 200) {
            setErrorMessage("Error loading results, please reload page.")
            return
        }

        try {
            rawAPIData = await result.json()
        } catch (err) {
            console.error(err)
            console.log(url)
        }

        const data = rawAPIData.data;
        const temp_checkbox_state_array = [];
        data.forEach((carData) => {
            carsArray.push(carData.id)
            temp_checkbox_state_array.push(false)
        })
        setCheckboxStates(temp_checkbox_state_array)
        setCars(carsArray)
        setCarData(data)
        carsFunc(data)
        setLoading(false)
        return "success"
    }

    useEffect(() => {
        getCars()
        // eslint-disable-next-line
    }, [])//!DO NOT REMOVE THIS DEPENDANCY ARRAY OR EVERYTHING BREAKS



    const handleCheck = (event) => {
        const state = event.target.checked
        const value = parseInt(event.target.name)

        if (isNaN(value)) { console.error("value is NaN") }

        const temp_states_array = [];
        //update the checkbox tracking array
        for (let i = 0; i < checkboxStates.length; i++) {
            if (i === value) {
                temp_states_array.push(state)
            } else {
                temp_states_array.push(checkboxStates[i])
            }
        }
        setCheckboxStates(temp_states_array)

        if (state === true) {
            setCarsSelected([...carsSelected, value])

        } else if (state === false) {
            setCarsSelected((prevState) =>
                prevState.filter((prevItem) => prevItem !== value)
            );
        }
    }

    const postCarData = async (data) => {
        const url = baseURL + "cars/reset-bulk"
        const fetchOptions = {
            method: "POST",
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
        //post request
        return await fetch(url, fetchOptions)
    }

    const resetCars = async () => {
        if (carsSelected.length === 0) {
            return
        }
        //post request
        const data = {
            ids: carsSelected
        }
        postCarData(data)
            .then(async (data) => {
                if (data.status === 204) {
                    setResetCarsPostSuccess(true)
                    setCollapseOpen(true)
                } else {
                    const parsed = await data.json()
                    setResetCarsPostSuccess(false)
                    setCollapseOpen(true)
                    setAlertTitle(parsed.message)
                    if (parsed.error) setAlertError(parsed.error)
                    await getCars()
                }
            })
            .catch((err) => {
                console.error(err)
                setResetCarsPostSuccess(false)
                setCollapseOpen(true)
            })
        //reset everything
        const temp_states_array = [];
        for (let i = 0; i < checkboxStates.length; i++) {
            temp_states_array.push(false)
        }
        setCheckboxStates(temp_states_array)
        setCarsSelected([])
    }

    const label = { inputProps: { 'aria-label': 'Reset Cars Checkbox' } };

    if (errorMessage === "") {
        return (
            <div className="reset-cars">
                <Stack spacing={2}>
                    <div className='reset-checkboxes'>
                        <Grid
                            container
                            justifyContent="center"
                        >
                            {cars && cars.map((car) => {
                                return (
                                    <div key={"reset-container-" + car.toString()}>
                                        <Grid
                                            item
                                            xs
                                            className='grid-item-reset-cars'
                                            ml={5}
                                            mr={5}
                                        >
                                            <p>Car {car.toString()}</p>
                                            <Checkbox
                                                {...label}
                                                id={"checkbox-" + car.toString()}
                                                color='primary'
                                                name={car.toString()}
                                                onChange={handleCheck}
                                                checked={checkboxStates[car]}
                                                disabled={(carData[car]).state !== "online"} //disable the checkbox if the car is not online
                                                sx={{
                                                    color: "#ffffff",
                                                    "&.Mui-disabled": {
                                                        color: "#808080"
                                                    }
                                                }}
                                            />
                                        </Grid>
                                    </div>
                                )
                            })}
                        </Grid>
                    </div>
                    <LoadingButton
                        className='reset-cars-button'
                        endIcon={<SendIcon />}
                        onClick={resetCars}
                        sx={{
                            "&.MuiLoadingButton-loading": { backgroundColor: "#be5602" },
                        }}
                        loading={loading}
                        variant="contained"
                    >Reset Cars</LoadingButton>

                    <Collapse
                        in={collapseOpen}
                        addEndListener={() => {
                            setTimeout(() => {
                                setCollapseOpen(false)
                            }, ALERT_DURATION);
                        }}
                        className="reset-cars-collapse"
                    >
                        <Alert
                            className='reset-cars-alert'
                            variant="filled"
                            severity={resetCarsPostSuccess ? "success" : "error"}
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
                            <AlertTitle>{resetCarsPostSuccess ? "Success" : alertTitle}</AlertTitle>
                            {resetCarsPostSuccess ? "The cars have been reset successfully." : alertError}
                        </Alert>
                    </Collapse>
                </Stack>
            </div>
        )
    } else {
        return (
            <div>
                <p>{errorMessage}</p>
            </div>
        )
    }
}

export default ResetCars

/*
<Button
    variant="contained"
    className='reset-cars-button'
    onClick={resetCars}
    sx={{ mt: 2 }}
>Reset Cars</Button>
*/
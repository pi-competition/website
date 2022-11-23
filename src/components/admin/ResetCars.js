import React, { useEffect, useState } from 'react'
import { Checkbox, Stack, Grid, Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"

import config from "../../config.json"

const ResetCars = () => {
    let rawAPIData;
    let result;
    let baseURL;
    const alert_duration = config.reset_cars_alert_duration
    const [cars, setCars] = useState([]);
    const [carsSelected, setCarsSelected] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState([])
    const [loading, setLoading] = useState(true);
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [resetCarsPostSuccess, setResetCarsPostSuccess] = useState(true);

    //set base url on whether the website is on staging or not
    const currentURL = window.location.href
    const currentURLArray = currentURL.split(".")
    if (currentURLArray[0] === "https://pi-comp") {
        baseURL = "https://papi-api.ben-services.eu.org/api/"
    } else {
        baseURL = "https://papi-api-stg.ben-services.eu.org/api/"
    }

    //baseURL = "https://papi-api.ben-services.eu.org/api/"//comment out for prod

    const getCars = async (result) => {
        //get car data from api
        const url = baseURL + "cars/status"
        const fetchOptions = {
            method: "GET"
        }

        const carsArray = [];

        result = await fetch(url, fetchOptions)
            .catch((err) => console.error(err))

        if (result.status !== 200) {
            console.log(result.status)
            return (
                <div>
                    <p>Error loading results, please reload page.</p>
                </div>
            )
        }

        try {
            rawAPIData = await result.json()
        } catch (err) {
            console.error(err)
            console.log(url)
        }

        const data = rawAPIData.data;
        //console.log(rawAPIData)
        //console.log(data)
        const temp_checkbox_state_array = [];
        data.forEach((carData) => {
            if (carData.state === "online") {
                carsArray.push(carData.id)
                temp_checkbox_state_array.push(false)
            }
        })
        //console.log(carsArray)
        setCheckboxStates(temp_checkbox_state_array)
        setCars(carsArray)
        setLoading(false)
        return "success"
    }

    useEffect(() => {
        getCars(result)
    }, [])

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
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
        //post request
        const response = await fetch(url, fetchOptions)
        return response.status
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
            .then((data) => {
                if (data === 204) {
                    setCollapseOpen(true)
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
                                        className='grid-item'
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
                    loadingIndicator="Please Reload The Page"
                    variant="contained"
                >Reset Cars</LoadingButton>

                <Collapse
                    in={collapseOpen}
                    addEndListener={() => {
                        setTimeout(() => {
                            setCollapseOpen(false)
                        }, alert_duration);
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
                        <AlertTitle>{resetCarsPostSuccess ? "Success" : "Error"}</AlertTitle>
                        {resetCarsPostSuccess ? "The cars have been reset successfully!" : "An error occured when atempting to reset the cars!"}
                    </Alert>
                </Collapse>
            </Stack>
        </div>
    )
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
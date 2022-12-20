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
    const ALERT_DURATION = config.reset_cars_alert_duration
    const [cars, setCars] = useState([]);
    const [carData, setCarData] = useState();
    const [carsSelected, setCarsSelected] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState([])
    const [loading, setLoading] = useState(true);
    const [collapseOpen, setCollapseOpen] = useState(false);
    const [resetCarsPostSuccess, setResetCarsPostSuccess] = useState(true);
    const [alertError, setAlertError] = useState("There was an error when reseting the cars");
    const [alertTitle, setAlertTitle] = useState("Error");
    const [bodyClassList, setBodyClassList] = useState(document.body.classList)

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
        const temp_checkbox_state_array = [];
        data.forEach((carData) => {
            carsArray.push(carData.id)
            temp_checkbox_state_array.push(false)
        })
        setCheckboxStates(temp_checkbox_state_array)
        setCars(carsArray)
        setCarData(data)
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
                'Content-Type': 'application/json',
                'Authorization': 'admin'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
        //post request
        const response = await fetch(url, fetchOptions)
        return response
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
                    console.log(parsed)
                    setResetCarsPostSuccess(false)
                    setCollapseOpen(true)
                    setAlertTitle(parsed.message)
                    if (parsed.error) { setAlertError(parsed.error) }
                    getCars()
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

    var bodyVar = document.documentElement || document.body;
    var observer = new MutationObserver(() => {
        setBodyClassList(document.body.classList)
        console.log(document.body.classList)
    })

    //console.log(bodyVar)

    observer.observe(bodyVar, {
        attributes: true,
        classList: true
    })

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
                                            disabled={(carData[car]).state === "online" ? false : true} //carData[car].state !== "online" ? false : true
                                            sx={{
                                                color: document.body.classList.length === 0 ? "#ffffff" : "#000000",
                                                "&.Mui-disabled": {
                                                    color: "#7d6d99"
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
                        {resetCarsPostSuccess ? "The cars have been reset successfully!" : alertError}
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
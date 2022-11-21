import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Button, Stack, Grid } from '@mui/material';

const ResetCars = () => {
    let rawAPIData;
    let result;
    const [cars, setCars] = useState([]);
    const [carsSelected, setCarsSelected] = useState([]);
    const [checkboxStates, setCheckboxStates] = useState([])

    const getCars = async (result) => {
        const url = "https://papi-api.ben-services.eu.org/api/cars/status"
        const fetchOptions = {
            method: "GET"
        }

        const carsArray = [];

        result = fetch(url, fetchOptions)
            .catch((err) => console.error(err))

        try {
            rawAPIData = await (await result).json()
        } catch (err) {
            console.error(err)
            return (
                <div>
                    <p>An error occured. Please refresh the page and try again</p>
                </div>
            )
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
    }

    useEffect(() => {
        getCars(result)
    }, [])

    const handleCheck = (event) => {
        const state = event.target.checked
        const value = parseInt(event.target.name)

        if (isNaN(value)) { console.error("value is NaN") }

        const temp_states_array = [];
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

    const resetCars = () => {
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
                <Button
                    variant="contained"
                    className='reset-cars-button'
                    onClick={resetCars}
                    sx={{ mt: 2 }}
                >Reset Cars</Button>
            </Stack>
        </div>
    )
}

export default ResetCars
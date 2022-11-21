import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Button, Stack, Grid } from '@mui/material';

const ResetCars = async () => {
    let rawAPIData;
    const [carData, setCarData] = useState({});
    const [carsSelected, setCarsSelected] = useState([]);

    const url = "https://papi-api.ben-services.eu.org/api/cars/status"
    const fetchOptions = {
        method: "GET"
    }

    const cars = [];

    const result = fetch(url, fetchOptions)
        .catch((err) => console.error(err))

    rawAPIData = await (await result).json()


    const data = rawAPIData.data;
    data.forEach(() => {
        cars.push(data.id)
    })

    console.log(cars)

    const handleCheck = (event) => {
        const state = event.target.checked
        const value = parseInt(event.target.name)

        if (isNaN(value)) { console.error("value is NaN") }

        if (state === true) {
            setCarsSelected([...carsSelected, value])
        } else if (state === false) {
            setCarsSelected((prevState) =>
                prevState.filter((prevItem) => prevItem !== value)
            );
        }

    }

    const resetCars = () => {
        console.log(carsSelected)
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
                        {cars.map((car) => {
                            if (cars) {
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
                                            />
                                        </Grid>
                                    </div>
                                )
                            }
                            return (
                                <p>Error with loading car data from /api/cars/status</p>
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
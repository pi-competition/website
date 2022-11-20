import React, { useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { Button, Stack, Grid } from '@mui/material';

const ResetCars = () => {
    const [carsSelected, setCarsSelected] = useState([]);

    const result = [1, 2, 3]

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
                        {result.map((car) => {
                            if (result)
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
                        })}
                    </Grid>
                </div>
                <Button
                    variant="contained"
                    className='reset-cars-button'
                    onClick={resetCars}
                    sx={{ mt: 2 }}
                >Reset Cars</Button>
            </Stack >
        </div >
    )
}

export default ResetCars
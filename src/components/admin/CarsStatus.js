import { Grid } from '@mui/material'
import React from 'react'
import CarStatusContainer from './CarStatusContainer'

const CarsStatus = ({ carsData }) => {
    return (
        <div className='car-status'>
            <Grid
                container
                justifyContent="center"
            >
                {carsData.map((carData) => {
                    console.log(carData)
                    return (
                        <div key={"car-container-" + carData.id}>
                            <Grid
                                item
                                xs
                                className='grid-item-cars-status'
                                ml={5}
                                mr={5}
                            >
                                <CarStatusContainer car={carData} />
                            </Grid>
                        </div>
                    )
                })}
            </Grid>
        </div>
    )
}

export default CarsStatus
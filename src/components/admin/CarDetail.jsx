import { Alert, AlertTitle, Collapse } from '@mui/material';
import React, { useEffect, useState } from 'react'

import config from "../../config.json"

const CarDetail = () => {
    let baseURL;
    let rawAPIData
    const ALERT_DURATION = config.resetCarsAlertDuration
    const [collpaseOpen, setCollapseOpen] = useState(false)
    const [carData, setCarData] = useState()
    const [errorMessage, setErrorMessage] = useState("An error has occurred!")
    const [loading, setLoading] = useState(true)

    //set base url on whether the website is on staging or not
    const currentURL = window.location.href
    const currentURLArray = currentURL.split(".")
    if (currentURLArray[0] === "https://pi-comp") {
        baseURL = "https://papi-api.ben-services.eu.org/api/"
    } else {
        baseURL = "https://papi-api-stg.ben-services.eu.org/api/"
    }

    const carID = window.location.pathname.split("/").at(-1)

    const getCarData = async () => {
        const url = baseURL + `cars/${carID}`
        const fetchOptions = {
            method: "GET"
        }

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
        setCarData(data)
        setLoading(false)
        return
    }

    useEffect(() => {
        getCarData()
    }, [])

    return (
        <div>
            {!loading &&
                <div>
                    {carData[0].state}
                </div>}
            <Collapse
                in={collpaseOpen}
                addEndListener={() => {
                    setTimeout(() => {
                        setCollapseOpen(false)
                    }, ALERT_DURATION);
                }}
                className="car-detail-collapse"
            >
                <Alert
                    variant='filled'
                    severity='error'
                >
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                </Alert>
            </Collapse>
        </div>
    )
}

export default CarDetail
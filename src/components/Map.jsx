import React, { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { parseMapData, parseLineData } from '../utils/parseMapData';
import MapBase from './MapBase';

const Map = () => {
    const [pointData, setPointData] = useState([])
    const [lineData, setLineData] = useState([])

    useEffect(() => {
        parseMapData().then((res) => {
            console.log(res)
            setPointData([...res])
        })
        parseLineData().then((res) => {
            console.log(res)
            setLineData([...res])
        })
    }, [])
    //const rectData = rectPositioning()

    if (lineData === [] || pointData === []) return (<div></div>)
    return (
        <MapBase pointData={pointData} lineData={lineData} />
    )

};

export default Map;
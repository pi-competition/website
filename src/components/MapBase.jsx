import React, { useEffect } from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import config from "../config/config.json"
import { Typography } from '@mui/material';
import { canvasDim, unParseClickLocation } from '../utils/parseMapData';

const MapBase = ({ pointData, lineData }) => {

    const [pointerPos, setPointerPos] = React.useState({ x: -1, y: -1 })

    const baseURL = config.apiURL

    const sendClickLoc = (e) => {
        const pointerPos = e.currentTarget.getPointerPosition()
        setPointerPos(unParseClickLocation(pointerPos))
        const url = baseURL + "/api/cars/set-destination"
        const fetchOptions = {
            method: "POST",
            mode: "cors",
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(pointerPos)
        }
        //post request
        fetch(url, fetchOptions)
            .then((result) => {
                if (result.status !== 204) {
                    console.log("something went wrong")
                }
            }).catch(() => {
                console.log("something went wrong version 2")
            })
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Typography variant="h6">
                Going to: {pointerPos.x === -1 ? "Nowhere" : pointerPos.x + ", " + pointerPos.y}
            </Typography>
            <div
                style={{
                    borderColor: "yellow",
                }}
            >
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{ backgroundColor: "#081421", borderColor: "yellow" }}
                    onClick={(e) => sendClickLoc(e)}
                >
                    <Layer>
                        {lineData.map((node) => {
                            return (
                                node.connections.map((conn) => {
                                    //console.log([node.x, node.y, conn.x, conn.y])
                                    return (
                                        <Line
                                            key={node.y + conn.x * Math.random()}
                                            points={[node.x, node.y, conn.x, conn.y]}
                                            strokeWidth={20}
                                            stroke={!node.intersection ? "#155956" : "#679289"}// dark cyan : greenish grey
                                        />
                                    )
                                })
                            )
                        })}
                    </Layer>
                    <Layer>
                        {pointData.map((node) => {
                            return (
                                <Circle
                                    x={node.x}
                                    y={node.y}
                                    radius={10}
                                    fill="#5bf4c6"// light cyan
                                    key={node.y + node.x * Math.random()}
                                />
                            )
                        })}

                    </Layer>
                </Stage>
            </div>
        </div >
    )
}

export default MapBase
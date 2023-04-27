import React, { useState, useEffect } from 'react';
import konva, { Stage, Layer, Circle, Line, Rect, Image } from 'react-konva';
import image from "../assets/sample_map_image.png"
import config from "../config/config.json"

const MapBase = ({ pointData, lineData }) => {

    const baseURL = config.apiURL

    const sendClickLoc = (e) => {
        const pointerPos = e.currentTarget.getPointerPosition()
        const url = baseURL + "/api/cars/reset-bulk"
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
        <div>
            <Stage
                width={config.mapDim.x}
                height={config.mapDim.y}
                style={{ backgroundColor: "#081421" }}
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
                                        stroke={!node.intersection ? "#155956" : "#679289"}
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
                                fill="#5bf4c6"
                                key={node.y + node.x * Math.random()}
                            />
                        )
                    })}

                </Layer>
            </Stage>
        </div >
    )
}

export default MapBase
import React, { useState, useEffect } from 'react';
import konva, { Stage, Layer, Circle, Line, Rect, Image } from 'react-konva';
import image from "../assets/sample_map_image.png"
import config from "../config/config.json"

const MapBase = ({ pointData, lineData }) => {

    //make background image
    const trackImage = new window.Image(1920, 950)
    trackImage.src = image
    return (
        <div>
            <Stage
                width={config.mapDim.x}
                height={config.mapDim.y}
                style={{ backgroundColor: "black" }}
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
                                        stroke={node.intersection ? "green" : "white"}
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
                                fill="red"
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
import sample_map_data from "../assets/sample_map_data.json"
import { testStatus } from "./controlServer"

export function canvasDim(axis) {
    const canvasWidth = window.innerWidth * 0.8
    const canvasHeight = window.innerHeight * 0.8
    if (axis === "x") return canvasWidth
    else if (axis === "y") return canvasHeight
}

const canvasWidth = canvasDim("x")
const canvasHeight = canvasDim("y")

export function getMapLayoutData() {
    return new Promise((resolve, reject) => {
        fetch("https://ctrl.ben-services.eu.org/ext/map/data").then((res) => {
            if (res.status !== 200) {
                resolve(sample_map_data.data.nodes)
            }
            res.json().then((data) => {
                resolve(data.data.nodes)
            }).catch((err) => {
                resolve(sample_map_data.data.nodes)
            })
        }).catch((err) => {
            resolve(sample_map_data.data.nodes)
        })
    })
}

let xMax;
let yMax;

getMapLayoutData().then((res) => {
    const data = res
    //console.log(data)
    let max_y = 0;
    let max_x = 0;
    data.forEach((node) => {
        if (node.y > max_y) max_y = node.y
        if (node.x > max_x) max_x = node.x
    })
    xMax = max_x
    yMax = max_y
})

export function maxValues() {
    return new Promise((resolve, reject) => {
        getMapLayoutData().then((res) => {
            const data = res
            let max_y = 0;
            let max_x = 0;
            data.forEach((node) => {
                if (node.y > max_y) max_y = node.y
                if (node.x > max_x) max_x = node.x
            })
            resolve([max_x, max_y])
        })

    })
}

export function parseMapData() {
    return new Promise((resolve, reject) => {
        getMapLayoutData().then((res) => {
            const coords = []
            const data = res
            data.forEach((node) => {
                coords.push({ x: (node.x * (canvasWidth / xMax)), y: ((/*yMax + (200 - (yMax % 200))) - */node.y) * (canvasHeight / yMax)) })
            })
            resolve(coords)
        })
    })
}

export function parseLineData() {
    return new Promise((resolve, reject) => {
        getMapLayoutData().then((res, err) => {
            const lines = []
            const data = res
            data.forEach((node) => {
                const newconns = []
                node.conns.map((conn) => {
                    conn.x = (conn.x * (canvasWidth / xMax))
                    conn.y = (conn.y * (canvasHeight / yMax))
                    newconns.push({ x: conn.x, y: conn.y })
                })
                lines.push({
                    x: (node.x * (canvasWidth / xMax)),
                    y: ((/*yMax + (200 - (yMax % 200))) - */node.y) * (canvasHeight / yMax)),
                    connections: node.conns,
                    intersection: node.is_intersection
                })
            })
            resolve(lines)
        })
    })
}
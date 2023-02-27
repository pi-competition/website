import React, { useState, useEffect } from 'react'
import content from "../assets/home.json"
import HomeContentContainer from './home/HomeContentContainer'

const Home = () => {
    const [time, setTime] = useState([0, 0, 0, 0]);
    let sectionCounter = 0;
    let previous_section;

    const formatSubheading = (string) => {
        if (string.split(" ").length === 1) {
            return string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
        } else {
            const stringArray = string.split(" ")
            for (let i = 0; i < stringArray.length; i++) {
                stringArray[i] = stringArray[i].toLowerCase().charAt(0).toUpperCase() + stringArray[i].toLowerCase().slice(1)
            }
            return stringArray.join(" ")
        }
    }

    useEffect(() => {
        const startDate = new Date().getTime() / 1000;
        // Do your operations
        const endDate = new Date('2023/03/20').getTime() / 1000
        let seconds = Math.floor((endDate - startDate))
        let days = 0
        let hours = 0
        let minutes = 0
        while (true) {
            if (seconds < 86400) {
                break
            }
            seconds = seconds - 86400
            days++
        }
        while (true) {
            if (seconds < 3600) {
                break
            }
            seconds = seconds - 3600
            hours++
        }
        while (true) {
            if (seconds < 60) {
                break
            }
            seconds = seconds - 60
            minutes++
        }
        setTime([days, hours, minutes, seconds])
    }, [])

    //timer
    setInterval(() => {
        const startDate = new Date().getTime() / 1000;
        // Do your operations
        const endDate = new Date('2023/03/20').getTime() / 1000
        let seconds = Math.floor((endDate - startDate))
        let days = 0
        let hours = 0
        let minutes = 0
        while (true) {
            if (seconds < 86400) {
                break
            }
            seconds = seconds - 86400
            days++
        }
        while (true) {
            if (seconds < 3600) {
                break
            }
            seconds = seconds - 3600
            hours++
        }
        while (true) {
            if (seconds < 60) {
                break
            }
            seconds = seconds - 60
            minutes++
        }
        setTime([days, hours, minutes, seconds])
    }, 1000)



    return (
        <div className='home'>
            <p className='text-4xl bold flex justify-center' id="home-title">Home</p>
            <br />
            <div className='home-container'>
                <h1 className="text-4xl bold flex justify-center">{time[0].toString() + " Days " + time[1].toString() + " Hours " + time[2].toString() + " Minutes " + time[3].toString() + " Seconds"}</h1>
                <h1 className="text-3xl bold flex justify-center">Until Deadline/Failure</h1>
            </div>
            {
                content["sections"].map((section) => {
                    if (sectionCounter === 0) {
                        previous_section = section;
                        sectionCounter++;
                        return (
                            <div key={section.title + "-subsection"}>
                                <p className='text-2xl bold flex ' id="home-subheading" >{formatSubheading(section.subsection)}</p>
                                <div>
                                    <HomeContentContainer content={section} />
                                </div>
                            </div>

                        )
                    } else {
                        if (previous_section.subsection === section.subsection) {
                            previous_section = section;
                            sectionCounter++;
                            return (
                                <div key={section.title + "-innersection"}>
                                    <HomeContentContainer content={section} />
                                </div>
                            )
                        } else {
                            previous_section = section;
                            sectionCounter++;
                            return (
                                <div key={section.title + "-subsection"
                                } >
                                    <p className='text-2xl bold flex ' id="home-subheading" >{formatSubheading(section.subsection)}</p>
                                    <div>
                                        <HomeContentContainer content={section} />
                                    </div>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}

export default Home
/*
if (section.text !== "subheading") {
        return (
            <div key={section.title + "-innersection"}>
                <HomeContentContainer content={section} />
            </div>
        )
    } else {
        return (
            <p className='text-2xl bold flex ' id="home-subheading" key={section.title + "-subheading"}>{section.title}</p>
        )
    }
*/
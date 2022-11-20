import React from 'react'
import content from "../assets/home.json"
import HomeContentContainer from './home/HomeContentContainer'

const Home = () => {
    let sectionCounter = 0;
    let previous_section;

    const formatSubheading = (string) => {
        if (string.split(" ").length === 1) {
            const formatted = string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
            return formatted
        } else {
            const stringArray = string.split(" ")
            for (let i = 0; i < stringArray.length; i++) {
                const formatted = stringArray[i].toLowerCase().charAt(0).toUpperCase() + stringArray[i].toLowerCase().slice(1)
                stringArray[i] = formatted
            }
            return stringArray.join(" ")
        }


    }

    return (
        <div className='home'>
            <p className='text-4xl bold flex justify-center' id="home-title">Home</p>
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
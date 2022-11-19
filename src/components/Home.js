import React from 'react'
import content from "../assets/home.json"
import HomeContentContainer from './home/HomeContentContainer'

const Home = () => {

    return (
        <div className='home'>
            <p className='text-4xl bold flex justify-center' id="home-title">Home</p>
            {
                content["sections"].map((section) => {
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
                })
            }
        </div>
    )
}

export default Home
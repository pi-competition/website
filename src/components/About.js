import React from 'react'
import content from "../assets/about.json"
import AboutContentContainer from './about/AboutContentContainer'

const About = () => {
    return (
        <div className='about'>
            {
                content["people"].map((person) => {
                    return (
                        <div key={"about-" + person.name}>
                            <AboutContentContainer name={person.name} text={person.text} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default About
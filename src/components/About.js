import React from 'react'
import _ from "lodash"
import content from "../assets/about.json"
import AboutContentContainer from './about/AboutContentContainer'

const About = () => {

    const random_people = _.shuffle(content["people"])

    return (
        <div className='about'>
            <p className='text-3xl bold flex justify-center'>About Us</p>
            {
                random_people.map((person) => {
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
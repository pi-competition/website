import React from 'react'
import { shuffle } from "random-generator.js"
import content from "../assets/about.json"
import AboutContentContainer from './about/AboutContentContainer'

const About = () => {

    const random_people = shuffle(content.people)

    return (
        <div className='about'>
            <p className='text-4xl bold flex justify-center' id="about-us-title">About Us</p>
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
import React from 'react'
import { shuffle, string } from "random-generator.js"
import content from "../assets/about.json"
import AboutContentContainer from './about/AboutContentContainer'

const About = () => {

    const random_people = shuffle(content.people)
    console.log(string(6, { numbers: false }))

    return (
        <div className='about'>
            <p className='text-4xl bold flex justify-center' id="about-us-title">About Us</p>
            {
                random_people.map((person) => {
                    return (
                        <div key={"about-" + person.name}>
                            <AboutContentContainer name={person.name} text={person.text} projects={person.projects} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default About
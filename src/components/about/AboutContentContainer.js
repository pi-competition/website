import React from 'react'
import parse from "html-react-parser"

const AboutContentContainer = ({ name, text }) => {

    console.log(name)
    console.log(text)

    return (
        <div className='about-container'>
            <h3 className='text-xl'>{name}</h3>
            <p>{parse(text)}</p>
            <br></br>
        </div>
    )
}

export default AboutContentContainer
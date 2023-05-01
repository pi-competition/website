import React from 'react'
import parse from "html-react-parser"

const AboutContentContainer = ({ content }) => {
    let jsx;
    if (content.type === "image") {
        jsx = (
            <div className="about-container">
                <h3 className="text-xl">{content.title}</h3>
                <img src={content.src} alt={content.title} className="about-container-image"></img>
            </div>
        )
    } else if (content.type === "text") {
        jsx = (
            <div className='about-container'>
                <h3 className='text-xl'>{content.title}</h3>
                <p>{parse(content.text)}</p>
            </div>
        )
    } else if (content.type === "disabled") {
        jsx = (
            <div className='about-container'>
                <p>Error: Incorrect type in about.json</p>
            </div>)

    }
    return jsx
}

export default AboutContentContainer
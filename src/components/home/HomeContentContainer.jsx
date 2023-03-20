import React from 'react'
import parse from "html-react-parser"

const HomeContentContainer = ({ content }) => {
    let jsx;
    if (content.type === "image") {
        jsx = (
            <div className="home-container">
                <h3 className="text-xl">{content.title}</h3>
                <img src={content.src} alt={content.title} className="home-container-image"></img>
            </div>
        )
    } else if (content.type === "text") {
        jsx = (
            <div className='home-container'>
                <h3 className='text-xl'>{content.title}</h3>
                <p>{parse(content.text)}</p>
            </div>
        )
    } else if (content.type === "disabled") {
        jsx = (
            <div className='home-container'>
                <p>Error: Incorret type in home.json</p>
            </div>)

    }
    return jsx
}

export default HomeContentContainer
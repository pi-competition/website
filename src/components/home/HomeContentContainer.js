import React from 'react'
import parse from "html-react-parser"

const HomeContentContainer = ({ content }) => {
    let jsx;
    if (content.text === "image") {
        jsx = (
            <div className="home-container">
                <h3 className="text-xl">{content.title}</h3>
                <img src={content.src} className="home-container-image"></img>
            </div>
        )
    } else {
        jsx = (
            <div className='home-container'>
                <h3 className='text-xl'>{content.title}</h3>
                <p>{parse(content.text)}</p>
            </div>
        )
    }
    return jsx
}

export default HomeContentContainer
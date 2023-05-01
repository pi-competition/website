import React from 'react'
import parse from "html-react-parser"

const DesignContentContainer = ({ content }) => {
    let jsx;
    if (content.type === "image") {
        jsx = (
            <div className="design-container">
                <h3 className="text-xl">{content.title}</h3>
                <img src={content.src} alt={content.title} className="design-container-image"></img>
            </div>
        )
    } else if (content.type === "text") {
        jsx = (
            <div className='design-container'>
                <h3 className='text-xl'>{content.title}</h3>
                <p>{parse(content.text)}</p>
            </div>
        )
    } else if (content.type === "disabled") {
        jsx = (
            <div className='design-container'>
                <p>Error: Incorrect type in design.json</p>
            </div>)

    }
    return jsx
}

export default DesignContentContainer
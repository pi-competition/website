import React from 'react'
import parse from "html-react-parser"

const HomeContentContainer = ({ content }) => {
    return (
        <div className='home-container'>
            <h3 className='text-xl'>{content.title}</h3>
            <p>{parse(content.text)}</p>
        </div>
    )
}

export default HomeContentContainer
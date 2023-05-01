import React from 'react'
import parse from "html-react-parser";

const AboutContentContainer = ({ name, text, projects }) => {
    return (
        <div className='about-container'>
            <h3 className='text-xl'>{name}</h3>
            <p>Contributions: {parse(text)}</p>
            <p>Projects:</p>
            <ul>
                {projects.map((project, index) => {
                    const splitProject = project.split(" ")
                    const wordArray = []
                    for (const word in splitProject) {
                        wordArray.push(splitProject[word][0].toUpperCase() + splitProject[word].substring(1))
                    }
                    return (
                        <li key={project.split(" ")[0] + "-key"}>{parse(`• ${wordArray.join(" ")}`)}</li>
                    )
                })
                }
            </ul>
        </div>
    )
}

export default AboutContentContainer
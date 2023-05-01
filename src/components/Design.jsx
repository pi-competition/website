import React from 'react'
import Typography from '@mui/material/Typography';
import Gradient from 'rgt'
import content from "../assets/design.json"
import DesignContentContainer from './design/DesignContentContainer'

const Design = () => {
    let sectionCounter = 0;
    let previous_section;

    const formatSubheading = (string) => {
        if (string.split(" ").length === 1) {
            return string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1)
        } else {
            const stringArray = string.split(" ")
            for (let i = 0; i < stringArray.length; i++) {
                stringArray[i] = stringArray[i].toLowerCase().charAt(0).toUpperCase() + stringArray[i].toLowerCase().slice(1)
            }
            return stringArray.join(" ")
        }
    }

    return (
        <div className='about'>
            <br />
            <Typography sx={{ fontWeight: 500, }} variant="h3" align="center" paragraph>
              <Gradient dir="left-to-right" from="#FF4500" to="#ffa500">
              Design
              </Gradient>
            </Typography>
            <br />
            <br />
            {
                content["sections"].map((section) => {
                    if (section.type === "disabled") return <div key={section.title}></div>
                    if (sectionCounter === 0) {
                        previous_section = section;
                        sectionCounter++;
                        return (
                            <div key={section.title + "-subsection"}>
                                <p className='text-2xl bold flex ' id="design-subheading" >{formatSubheading(section.subsection)}</p>
                                <div>
                                    <DesignContentContainer content={section} />
                                </div>
                            </div>

                        )
                    } else {
                        if (previous_section.subsection === section.subsection) {
                            previous_section = section;
                            sectionCounter++;
                            return (
                                <div key={section.title + "-innersection"}>
                                    <DesignContentContainer content={section} />
                                </div>
                            )
                        } else {
                            previous_section = section;
                            sectionCounter++;
                            return (
                                <div key={section.title + "-" + section.subsection + "subsection"
                                } >
                                    <p className='text-2xl bold flex ' id="design-subheading" >{formatSubheading(section.subsection)}</p>
                                    <div>
                                        <DesignContentContainer content={section} />
                                    </div>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}

export default Design
import React from 'react'
import Typography from '@mui/material/Typography';
import Gradient from 'rgt'
import { shuffle, string } from "random-generator.js"
import content from "../assets/team.json"
import TeamContentContainer from './team/TeamContentContainer'

const Team = () => {

    const random_people = shuffle(content.people)
    console.log(string(6, { numbers: false }))

    return (
        <div className='team'>
            <br />
            <Typography sx={{ fontWeight: 500, }} variant="h3" align="center" paragraph>
              <Gradient dir="left-to-right" from="#FF4500" to="#ffa500">
              Our Team
              </Gradient>
            </Typography>
            <br />
            <br />
            {
                random_people.map((person) => {
                    return (
                        <div key={"team-" + person.name}>
                            <TeamContentContainer name={person.name} text={person.text} projects={person.projects} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Team
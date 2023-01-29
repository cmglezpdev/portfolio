import { Title } from "../titles/Title"
import { Project } from "./Project"

import './othersWorks.scss'

import CalendarAppImage from '../../props/Projects/CalendarAppImage.png';
import JournalAppImage from '../../props/Projects/JournalAppImage.png';
import OpenJiraImage from '../../props/Projects/OpenJiraImage.png';
import PockedexImage from '../../props/Projects/PockedexImage.png';
import DominoImage from '../../props/Projects/DominoGameImage.jpg';
import PokedexImage from '../../props/Projects/PokedexImage.jpg';



export const OthersWorks = () => {
    return (
        <div className="more-projects">
            <Title text={"More projects"} />
            
            <div className="projects">
                     
                <Project
                    image={OpenJiraImage}
                    titleProject={"Open Jira"}
                    technologies={["NextJs", "MaterialUI"]}
                    description={"A small task manager for controlling your work"}
                    urlSourceCode={"https://github.com/cmglezpdev/Open-Jira-App"}
                    urlLiveApp={"https://open-jira-nextapp.netlify.app/"} 
                />

                <Project
                    image={PockedexImage}
                    titleProject={"Pockedex"}
                    technologies={["NextJs", "NextUI"]}
                    description={"Page with the main information of all the pokemons"}
                    urlSourceCode={"https://github.com/cmglezpdev/Pockemon-Next-App"}
                    urlLiveApp={"https://pockemon-next-app.vercel.app/"} 
                />

                <Project
                    image={JournalAppImage}
                    titleProject={"Journal App"}
                    technologies={["React", "Redux", "Sass"]}
                    description={"Create an account and start taking your daily notes."}
                    urlSourceCode={"https://github.com/cmglezpdev/Journal-App"}
                />

                <Project
                    image={CalendarAppImage}
                    titleProject={"Calendar App"}
                    technologies={["React", "Redux", "TailwindCSS", "Node", "Express", "MongoDB"]}
                    description={"Create an account and start creating your events in your calendar."}
                    urlSourceCode={"https://github.com/cmglezpdev/Calendar-App-Client"}
                    urlLiveApp={"https://calendar-nodejs-reactcours.herokuapp.com"} 
                />

                <Project
                    image={DominoImage}
                    titleProject={"Domino Simulation"}
                    technologies={["React", "SASS", ".Net"]}
                    description={"You can create the several simulation of the domino game with several rules differences of the classics."}
                    urlSourceCode={"https://github.com/cmglezpdev/Domino"}
                />

                <Project
                    image={PokedexImage}
                    titleProject={"Pokedex API"}
                    technologies={["Nest.js", "MongoDB"]}
                    description={"RESTFul API to create, edit, delete, check and see information of the pokemons."}
                    urlSourceCode={"https://github.com/cmglezpdev/nest-pokedex"}
                />
            </div>
        </div>
    )

}

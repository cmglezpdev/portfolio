import { Title } from "../titles/Title"
import { Project } from "./Project"

import './othersWorks.scss'

import CalendarAppImage from '../../props/Projects/CalendarAppImage.png';
import JournalAppImage from '../../props/Projects/JournalAppImage.png';
import OpenJiraImage from '../../props/Projects/OpenJiraImage.png';
import PockedexImage from '../../props/Projects/PockedexImage.png';



export const OthersWorks = () => {
    return (
        <div className="more-projects">
            <Title text={"More projects"} />
            
            <div className="projects">
                
                <Project
                    image={JournalAppImage}
                    titleProject={"Journal App"}
                    technologies={["React", "Redux", "Sass"]}
                    description={"Ya puedes crearte una cuenta y empezar a tomar tus notas diarias"}
                    urlSourceCode={"https://github.com/cmglezpdev/Journal-App"}
                    // urlLiveApp={""} 
                />

                <Project
                    image={CalendarAppImage}
                    titleProject={"Calendar App"}
                    technologies={["React", "Redux", "TailwindCSS", "Node", "Express", "MongoDB"]}
                    description={"Ya puedes crearte una cuenta y empezar a crear eventos en tu calendario."}
                    urlSourceCode={"https://github.com/cmglezpdev/Calendar-App-Client"}
                    urlLiveApp={"https://calendar-nodejs-reactcours.herokuapp.com"} 
                />
     
                <Project
                    image={OpenJiraImage}
                    titleProject={"Open Jira"}
                    technologies={["NextJs", "MaterialUI"]}
                    description={"Un pequeño manejador de tareas diarias para controlar tu trabajo"}
                    urlSourceCode={"https://github.com/cmglezpdev/Open-Jira-App"}
                    urlLiveApp={"https://open-jira-nextapp.netlify.app/"} 
                />

                <Project
                    image={PockedexImage}
                    titleProject={"Pockedex"}
                    technologies={["NextJs", "NextUI"]}
                    description={"Una paguina con la información principal de todos los pokemones"}
                    urlSourceCode={"https://github.com/cmglezpdev/Pockemon-Next-App"}
                    urlLiveApp={"https://pockemon-next-app.vercel.app/"} 
                />

                
            </div>
        </div>
    )

}

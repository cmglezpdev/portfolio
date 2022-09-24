import { Title } from "../titles/Title"
import { Project } from "./Project"

import './othersWorks.scss'

import baseImg from '../../props/img3.jpg'
import CalendarAppImage from '../../props/Projects/CalendarAppImage.png';
import JournalAppImage from '../../props/Projects/JournalAppImage.png';



export const OthersWorks = () => {
    return (
        <div className="more-projects">
            <Title text={"More projects"} />
            
            <div className="projects">
                
                <Project
                    image={JournalAppImage}
                    titleProject={"Journal App"}
                    technologies={["Sass", "React", "Redux"]}
                    description={"Ya puedes crearte una cuenta y empezar a tomar tus notas diarias"}
                    urlSourceCode={"https://github.com/cmglezpdev/Journal-App"}
                    // urlLiveApp={""} 
                />

                <Project
                    image={CalendarAppImage}
                    titleProject={"Calendar App"}
                    technologies={["TailwindCSS", "React", "Redux"]}
                    description={"Ya puedes crearte una cuenta y empezar a crear eventos en tu calendario."}
                    urlSourceCode={"https://github.com/cmglezpdev/Calendar-App-Client"}
                    // urlLiveApp={"https://calendar-nodejs-reactcours.herokuapp.com/"} 
                />

                <Project
                    image={CalendarAppImage}
                    titleProject={"Calendar App"}
                    technologies={["Node", "Express", "MongoDB"]}
                    description={"Backend desarrollado para nuestra aplicación de calendario API REST para manecar la autenticación y creación de eventos"}
                    urlSourceCode={"https://github.com/cmglezpdev/Calendar-App-Backend"}
                    // urlLiveApp={"https://calendar-nodejs-reactcours.herokuapp.com/"} 
                />

        
                <Project
                    image={baseImg}
                    titleProject={"Heroes App"}
                    technologies={["React", "CSS"]}
                    description={"Muesta información de varios heroes de Marvel y DC, desarrollada para apreder React Router"}
                    urlSourceCode={"https://github.com/cmglezpdev/Heroes-app"}
                    // urlLiveApp={""} 
                />

                
            </div>
        </div>
    )

}

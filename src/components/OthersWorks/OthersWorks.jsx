import { Title } from "../titles/Title"
import { Project } from "./Project"

import './othersWorks.scss'

export const OthersWorks = () => {
    return (
        <div className="more-projects">
            <Title text={"More projects"} />
            
            <div className="projects">
                
                <Project
                    titleProject={"Journal App"}
                    technologies={["Sass", "React", "Redux"]}
                    description={"Ya puedes crearte una cuenta y empezar a tomar tus notas diarias"}
                    urlSourceCode={"https://github.com/cmglezpdev/Journal-App"}
                    urlLiveApp={""} 
                />

                <Project
                    titleProject={"Calendar App"}
                    technologies={["TailwindCSS", "React", "Redux"]}
                    description={"Ya puedes crearte una cuenta y empezar a crear eventos en tu calendario."}
                    urlSourceCode={"https://github.com/cmglezpdev/Calendar-App-Client"}
                    urlLiveApp={"https://calendar-nodejs-reactcours.herokuapp.com/"} 
                />

                <Project
                    titleProject={"Calendar App"}
                    technologies={["Node", "Express", "MongoDB"]}
                    description={"Backend desarrollado para nuestra aplicación de calendario API REST para manejar la autenticación y creación de eventos"}
                    urlSourceCode={"https://github.com/cmglezpdev/Calendar-App-Backend"}
                    urlLiveApp={"https://calendar-nodejs-reactcours.herokuapp.com/"} 
                />

        
                <Project
                    titleProject={"Heroes App"}
                    technologies={["React", "CSS"]}
                    description={"Muesta información de varios heroes de Marvel y DC, desarrollada para apreder React Router"}
                    urlSourceCode={"https://github.com/cmglezpdev/Heroes-app"}
                    urlLiveApp={""} 
                />

                
            </div>
        </div>
    )

}

import { Title } from "../titles/Title"
import { Project } from "./Project"

import './othersWorks.scss'

export const OthersWorks = () => {
    return (
        <div className="more-projects">
            <Title text={"More projects"} />
            
            <div className="projects">
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
            </div>
        </div>
    )

}

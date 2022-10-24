
import { Title } from '../';
import { OthersWorks } from '../OthersWorks/OthersWorks';
import { CardOne } from './CardOne';
import { CardTwo } from './CardTwo';
import { CardThree } from './CardThree';
import './work.scss';


export const Work = () => {
    return (
        <div className='work-container' id='works'>
            <Title text={"Work"}/>
    
            {/* Seccion de principales projectos que he hecho */}
            <div className="principal-projects">
                <CardOne />
                <CardTwo />
                <CardThree />
            </div>

            <OthersWorks />
            {/* Seccion de mas proyectos */}
            {/* Proyectos de la universidad, trabajos personales */}
        </div>
    )
}

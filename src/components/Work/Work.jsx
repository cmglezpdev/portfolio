
import { Title } from '../';
import { CardOne } from './CardOne';
import './work.scss';


export const Work = () => {
    return (
        <div className='work-container' id='work'>
            <Title text={"Work"}/>
        
            {/* Seccion de principales projectos que he hecho */}
            <div className="principal-projects">
                <CardOne />
            </div>
            {/* Seccion de mas proyectos */}
            {/* Proyectos de la universidad, trabajos personales */}
        </div>
    )
}

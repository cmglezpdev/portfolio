

import './about.scss';
import me from '../../props/me.jpg';
import { Title } from '../';



export const About = () => {
    return (
        <div className="container-about" id="about">
            <Title text={"About"}/>

            <div className='about-information'>
                <div className='photo'>
                    <img src={me} alt="Me" />
                </div>
                <div className="description">
                    <p>
                        Hola, mi nombre es Carlos Manuel González y soy estudiante de Ciencias de la Computación en la Universidad de la Habana. <br />
                        Me apasiona el mundo del desarrollo web, las criptomonedas y el machine learning, aunque actualmente estoy enfocado en el desarrollo web. <br />
                        Empecé a programar a los 16 años en la parte de programación competitiva. Estube 3 años enfocado solo en eso y participé en muchas competencias tanto nacionales como internacionales desde mi preuniversitario. <br />

                        Cuando entré en la universidad emprecé a interesarme mas por el desarrollo web, llegando a desarrollar aplicaciones tanto frontend como de backend. <br />
                        No he tenido todavía experiencia laboral pero si sigo creando aplicaciones personales como parte de mi aprendizaje, y estoy abierto a poder trabajar y colaborar con una empresa u otro desarrollador que quiera trabajar conmigo. <br />
                    </p>
                </div>
            </div>
        </div>
    )
}



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
                        Hi! My name is Carlos Manuel González and I am a student of Computer Science at the University of Havana. <br />
                        I really love running, going out with my friends. I'm very curious and I keep in continuous learning about the things that I like. <br />
                        I'm passionate about web development, cryptocurrencies and machine learning, but currently I'm enfoced on web development. <br />
                        I started programming when have 16 years old in the competitive programming. I have been 3 years focused only on that and participated in many national and international competitions from my preuniversity. <br />

                        When I ingresed in the university I started to interest more in web development, and I come to develop applications both frontend and backend. <br />
                        I haven't had any real laboral experience yet, but I'm open to the learning and work and collaborate with a company or another developer that wants to work with me. <br />

                    </p>
                </div>
            </div>
        </div>
    )
}

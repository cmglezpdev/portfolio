import LazyLoad from 'react-lazy-load';

import './about.scss';
import me from '../../props/me.jpg';
import { Title } from '../';



export const About = () => {
    return (
        <div className="container-about" id="about">
            <Title text={"About"}/>

            <div className='about-information'>
                <div className='photo'>
                    <LazyLoad>
                        <img src={me} alt="Me" />
                    </LazyLoad>
                </div>
                <div className="description">
                    <p>
                        Hi! My name is Carlos Manuel González and i'm a student of Computer Science at the University of Havana. <br />
                        I really love running and going out with my friends. I'm very curious and keep in continuous learning about the things that I like. <br />
                        I'm passionate about web development, cryptocurrencies and machine learning, but currently I'm enfoced on web development. <br />
                        I started programming when have 16 years old in the competitive programming. I have been 3 years focused only on that and participated in many national and international competitions from my preuniversity. <br />
                        When I ingresed in the university I started to interest more in web development, and I come to develop applications both frontend and backend. <br />
                    </p>
                </div>
            </div>
        </div>
    )
}

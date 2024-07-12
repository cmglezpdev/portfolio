import LazyLoad from 'react-lazy-load';

import './about.scss';
// import me from '../../props/me.webp';
import { Title } from '../';



export const About = () => {
    return (
        <div className="container-about" id="about">
            <Title text={"About"}/>

            <div className='about-information'>
                <div className='photo'>
                    <LazyLoad className='photo-lazy'>
                        <img src='/me.webp' width='auto' height='auto' alt="Carlos Manuel González" />
                    </LazyLoad>
                </div>
                <div className="description">
                    <p>
                        <span>Who am I?</span> <br />
                        <p>Software Developer and Computer Science Student. +3 years of experience developing web applications and management systems. Lover of competitive programming, mathematics, and research. Constantly learning new technologies and skills that improve my professional career.</p>
                    </p>
                </div>
            </div>
        </div>
    )
}

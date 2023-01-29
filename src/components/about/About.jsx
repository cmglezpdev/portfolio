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
                        <span>Who I am?</span> <br />
                        Hi, My name is Carlos Manuel, I'm Computer Science Student and Software Developer.<br />
                        Started my career in the 2016 participating in Competitive Programming Contest solving problems about Data Structures and Algorithms, and currenly I develop Full Stack Web Applications.<br />
                        I'm very perseverant, i like keeping in learning and passed my free time with my friends and family.<br />
                        I'm open to work in new offerts and get my maximun potential to contribute with my knowledge and experience to the developemt to the company.
                    </p>
                </div>
            </div>
        </div>
    )
}

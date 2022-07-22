

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
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo corrupti alias tempore velit dolorum labore exercitationem, iusto excepturi ex quo eius aliquid porro, voluptatem odit officia harum optio nostrum ipsam.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste maxime officia velit quam libero quaerat ipsa deserunt culpa itaque sit pariatur, quas obcaecati? Distinctio, rem nulla! Tempora libero neque quibusdam.
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum sequi quaerat facere deleniti, dicta, nam provident exercitationem sunt perspiciatis nulla, minima assumenda nisi culpa velit natus est incidunt quis quia!
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam, at sapiente natus facere, harum ut nemo quis architecto temporibus sequi repudiandae voluptates quod quibusdam dicta sed perferendis quae aliquid sint.
                    </p>
                </div>
            </div>
        </div>
    )
}

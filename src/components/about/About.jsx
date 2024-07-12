import LazyLoad from 'react-lazy-load';

import './about.scss';
// import me from '../../props/me.webp';
import { Title } from '../';



export const About = () => {
    return (
        <div className="container-about" id="about">
            <Title text={"About"}/>

            <div className='about-information'>
                <div className="description">
                    <p>
                        My name is Carlos Manuel and I am 23 years old. I discovered programming in 2016 during an elective Informatics course in high school, where 
                        I participated in Competitive Programming contests. Although I didn't always achieve the desired results, 
                        I managed to rank in the <span className='text-hightlight'>top 10 in two national competitions</span>.
                    </p>
                    <p>
                        In 2020, I enrolled at university to study Computer Science, where I have strengthened my scientific skills and explored fascinating areas such 
                        as <span className='text-hightlight'>Artificial Intelligence, Machine Learning, Distributed Systems, and Programming Languages</span>, among others. Concurrently, I began learning about 
                        web development and <span className='text-hightlight'>creating efficient solutions</span>, which led me to work in the software industry, specializing in both  <span className='text-hightlight'>frontend</span> and <span className='text-hightlight'>backend development</span>.
                    </p>
                    <p>
                        I am passionate about software and always eager to learn more. My <span className='text-hightlight'>curiosity</span> has driven me to <span className='text-hightlight'>explore DevOps, Cloud Computing, cryptocurrencies, and blockchain</span>, 
                        as well as essential skills like <span className='text-hightlight'>marketing, design, and entrepreneurship</span>. I firmly believe in never stopping learning to enhance my professional career.
                    </p>
                </div>
                {/* <div className="description">
                    <p>
                        Me llamo Carlos Manuel y tengo 23 años. Descubrí la programación en 2016 durante un curso optativo de Informática en el preuniversitario, 
                        donde participé en concursos de Programación Competitiva. Aunque no siempre alcancé los resultados deseados, logré estar en el top 10 en 
                        2 competencias a nivel nacional.
                    </p>
                    <p>
                        En 2020, ingresé a la Universidad para estudiar Ciencias de la Computación, donde he fortalecido mis habilidades científicas y explorado 
                        áreas fascinantes como Inteligencia Artificial, Machine Learning, Sistemas Distribuidos, Lenguajes de Programación, entre otros. Paralelamente, 
                        comencé a aprender sobre desarrollo web y a crear soluciones eficientes, lo que me llevó a trabajar en la industria del software, especializándome 
                        en frontend y backend.
                    </p>
                    <p>
                        Soy un apasionado del software, siempre buscando aprender más. Mi curiosidad me ha llevado a explorar DevOps, Cloud Computing, criptomonedas y blockchain, 
                        así como habilidades esenciales como marketing, diseño y emprendimiento. Creo firmemente en nunca dejar de aprender para potenciar mi carrera profesional.
                    </p>
                </div> */}
                <div className='photo'>
                    <LazyLoad className='photo-lazy'>
                        <img src='/me.webp' width='auto' height='auto' alt="Carlos Manuel González" />
                    </LazyLoad>
                </div>
            </div>
        </div>
    )
}

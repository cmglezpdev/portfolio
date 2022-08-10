

import img from '../../props/img4.jpg'

export const Project = () => {


    return (
        <>
            <div className="project" >
                <img src={img} alt="project" className='image' />
                
                <div className='info-hover'>
                    <div className="title">
                        <span className="title-project">Journal App</span>
                        <div className='row'></div>
                    </div>
                    <div className="technologies">
                        <span>TailwindCSS</span>
                        <span>React</span>
                        <span>Redux</span>
                    </div>
                    <p className="description">Ya puedes crearte una cuenta y empezar a tomar tus notas diarias. Aplicación desarrollada para aprender Redux, Tailwind y Firebase</p>
                
                    <div className="buttons">
                        <button className="source-code">Source</button>
                        <button className="live-app">Live</button>
                    </div>
                </div>    
            </div>
        </>
    )
}

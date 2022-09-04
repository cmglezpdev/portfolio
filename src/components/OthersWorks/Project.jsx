
export const Project = ({ image, titleProject, technologies, description, urlSourceCode, urlLiveApp }) => {

    return (
        <>
            <div className="project" >

                <img src={image} alt={titleProject} className='image' />

                <div className='info-hover'>
                    <div className="title">
                        <span className="title-project">{ titleProject }</span>
                        <div className='row'></div>
                    </div>
                    <div className="technologies">
                        {
                            technologies.map((technology, index) => (
                                <span key={index}>{technology}</span>
                            ))
                        }
                    </div>
                    <p className="description">{ description }</p>
                
                    <div className="buttons">
                        <a href={urlSourceCode}><button src={urlSourceCode} className="source-code">Source</button></a>
                        <a href={urlLiveApp}><button src={urlLiveApp} className="live-app">Live</button></a>
                    </div>
                </div>    
            </div>
        </>
    )
}

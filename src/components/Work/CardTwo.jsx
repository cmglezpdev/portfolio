import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { FaReact, FaSass } from 'react-icons/fa';


import './cardProject.scss';
import imageProject from '../../props/img3.jpg';


export const CardTwo = () => {
  return (
    <div className='card-container' id='two'>
      <div className='cover-image'>
        <img src={imageProject} alt="cmglezpdev-protfolio" />
      </div>
      
      <div className="card-information">
          <span className='status-project'>currely working on</span>

          <div className='title-project'>
            <h3>Portfolio</h3>
            <div></div>
          </div>

          <div className="technologies">
            
            <div className="tech">
              <AiFillHtml5 />
              <span>HTML</span>
            </div>

            <div className="tech">
              <FaReact />
              <span>REACT</span>
            </div>
                    
            <div className="tech">
              <FaSass />
              <span>SASS</span>
            </div>
  
          </div>

          <p className='description'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste hic expedita 
          </p>

          <div className='buttons'>
              <a href='#' target={"_blank"} rel='noreferrer'><button>
                <RiShareForwardFill />
                Live
              </button></a>

              <a href='https://github.com/cmglezpdev/portfolio' target={"_blank"} rel='noreferrer'><button>
                <AiFillGithub />
                Source
              </button></a>
          </div>

      </div>
    </div>
  )
}

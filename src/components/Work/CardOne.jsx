import LazyLoad from 'react-lazy-load';
import { AiFillGithub } from 'react-icons/ai';
import { FaReact, FaSass } from 'react-icons/fa';
import { IoLogoElectron } from 'react-icons/io5';
import { RiShareForwardFill } from 'react-icons/ri';

import imageProject from '../../props/Projects/MusicfyImage.png'
import './cardProject.scss';

export const CardOne = () => {
  return (
    <div className='card-container' id='one'>
      <LazyLoad className='cover-image'>
        <div style={{ position: 'relative' }}>
          <img src={imageProject} alt="Musicfy" />
        </div>
      </LazyLoad>
      
      <div className="card-information">
          {/* <span className='status-project'>currenly working on</span> */}
          
          <div className='title-project'>
            <h3>Musicfy</h3>
            <div></div>
          </div>

          <div className="technologies">
      
            <div className="tech">
              <FaReact />
              <span>REACT</span>
            </div>
          
            <div className="tech">
              <IoLogoElectron />
              <span>ELECTRON</span>
            </div>
          
            <div className="tech">
              <FaSass />
              <span>SASS</span>
            </div>
  
          </div>

          <p className='description'>
            Musicfy is a desktop application that allow us to listen to music and, if you are admin, create albums and upload new music
          </p>

          <div className='buttons'>
              <a href='https://musicfy-app.vercel.app/' target={"_blank"} rel='noreferrer'><button>
                <RiShareForwardFill />
                Live
              </button></a>

              <a href='https://github.com/cmglezpdev/Musicfy' target={"_blank"} rel='noreferrer'><button>
                <AiFillGithub />
                Source
              </button></a>
          </div>

      </div>
    </div>
  )
}

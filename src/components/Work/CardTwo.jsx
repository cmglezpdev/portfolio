import LazyLoad from 'react-lazy-load';
import { AiFillGithub } from 'react-icons/ai';
import { SiMongodb, SiNextdotjs, SiNodedotjs, SiTailwindcss } from 'react-icons/si';

import imageProject from '../../props/Projects/TwitterCloneImage.png';
import './cardProject.scss';

export const CardTwo = () => {
  return (
    <div className='card-container' id='two'>
      <LazyLoad className='cover-image'>
        <div style={{ position: 'relative' }}>
            <img src={imageProject} alt="Twitter Clone" />
        </div>
      </LazyLoad>
      
      <div className="card-information">
        <span className='status-project'>currenly working on</span>
          <div className='title-project'>
            <h3>Twitter Clone</h3>
            <div />
          </div>

          <div className="technologies">
            
            <div className="tech">
              <SiNextdotjs />
              <span>Next.js</span>
            </div>
            <div className="tech">
              <SiTailwindcss />
              <span>Tailwind</span>
            </div>

            <div className="tech">
              <SiNodedotjs />
              <span>Node</span>
            </div>
            
            <div className="tech">
              <SiMongodb />
              <span>Mongo DB</span>
            </div>
          
          </div>
          <p className='description'>
            A small twitter clone with the main functionalities of the original app.  
          </p>

          <div className='buttons'>
              {/* <a href='cmglezpdev.vercel.com' target={"_blank"} rel='noreferrer'><button>
                <RiShareForwardFill />
                Live
              </button></a> */}

              <a href='https://github.com/cmglezpdev/twitter-clone' target={"_blank"} rel='noreferrer'><button>
                <AiFillGithub />
                Source
              </button></a>
          </div>
      </div>
    </div>
  )
}

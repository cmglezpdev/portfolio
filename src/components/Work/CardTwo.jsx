import LazyLoad from 'react-lazy-load';
import { AiFillGithub } from 'react-icons/ai';
import { TbCSharp } from 'react-icons/tb';
import { FaReact, FaSass } from 'react-icons/fa';

import imageProject from '../../props/Projects/DominoGameImage.jpg';
import './cardProject.scss';

export const CardTwo = () => {
  return (
    <div className='card-container' id='two'>
      <LazyLoad className='cover-image'>
        <img src={imageProject} alt="domino" />
      </LazyLoad>
      
      <div className="card-information">
        
          <div className='title-project'>
            <h3>Domino App</h3>
            <div />
          </div>

          <div className="technologies">
            
            <div className="tech">
              <FaReact />
              <span>REACT</span>
            </div>
            <div className="tech">
              <FaSass />
              <span>SASS</span>
            </div>

            <div className="tech">
              <TbCSharp />
              <span>.Net</span>
            </div>
  
          </div>
          <p className='description'>
           A Domino Game that allow us simulate games with rules completely differents of the classic.   
          </p>

          <div className='buttons'>
              {/* <a href='cmglezpdev.vercel.com' target={"_blank"} rel='noreferrer'><button>
                <RiShareForwardFill />
                Live
              </button></a> */}

              <a href='https://github.com/cmglezpdev/domino' target={"_blank"} rel='noreferrer'><button>
                <AiFillGithub />
                Source
              </button></a>
          </div>

      </div>
    </div>
  )
}

import LazyLoad from 'react-lazy-load';
import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { FaReact } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';

import imageProject from '../../props/img3.jpg'
import './cardProject.scss';

export const CardThree = () => {
  return (
    <div className='card-container' id='three'>

      <LazyLoad className="cover-image">
        <img src={imageProject} alt="GeoMaps" />
      </LazyLoad>
      
      <div className="card-information">
          
          <span className='status-project'>currenly working on</span>
          
          <div className='title-project'>
            <h3>GeoMaps</h3>
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
              <SiTypescript />
              <span>TYPESCRIPT</span>
            </div>
          </div>

          <p className='description'>
            GeoMaps is a web application that allows you to search places and see the distances and the tour bewtween them.
          </p>

          <div className='buttons'>
              <a href='#' target={"_blank"} rel='noreferrer'><button>
                <RiShareForwardFill />
                Live
              </button></a>

              <a href='https://github.com/cmglezpdev/GeoMaps' target={"_blank"} rel='noreferrer'><button>
                <AiFillGithub />
                Source
              </button></a>
          </div>

      </div>
    </div>
  )
}

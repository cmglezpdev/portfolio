import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { FaReact, FaSass } from 'react-icons/fa';
import { IoLogoElectron } from 'react-icons/io5';




import './cardProject.scss';
import imageProject from '../../props/Projects/Musicfy/image.png'


export const CardOne = () => {
  return (
    <div className='card-container' id='one'>
      <div className='cover-image'>
        <img src={imageProject} alt="Musicfy" />
      </div>
      
      <div className="card-information">
          <span className='status-project'>currely working on</span>
          
          <div className='title-project'>
            <h3>Musicfy</h3>
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
              <IoLogoElectron />
              <span>ELECTRON</span>
            </div>
          
            <div className="tech">
              <FaSass />
              <span>SASS</span>
            </div>
  
          </div>

          <p className='description'>
            Musicfy is a desktop and web application that allows you to create your own playlist and share it with your friends.
          </p>

          <div className='buttons'>
              <a href='#' target={"_blank"} rel='noreferrer'><button>
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

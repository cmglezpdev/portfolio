import { AiFillGithub, AiFillHtml5 } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import { FaReact, FaSass } from 'react-icons/fa';
import { IoLogoElectron } from 'react-icons/io5';




import './cardProject.scss';
import imageProject from '../../props/img3.jpg'


export const CardOne = () => {
  return (
    <div className='card-container'>
      <img src={imageProject} alt="PRoject" />
      
      <div className="card-information">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iste hic expedita 
          </p>

          <div className='buttons'>
              <button>
                <RiShareForwardFill />
                Live
              </button>

              <button>
                <AiFillGithub />
                Source
              </button>
          </div>

      </div>
    </div>
  )
}

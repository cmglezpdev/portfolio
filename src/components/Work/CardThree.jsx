import LazyLoad from 'react-lazy-load';
import { AiFillGithub } from 'react-icons/ai';
import { SiNextdotjs, SiTypescript, SiMaterialui } from 'react-icons/si';
import { RiShareForwardFill } from 'react-icons/ri';

import imageProject from '../../props/Projects/TesloShopImage.png'
import './cardProject.scss';

export const CardThree = () => {
  return (
    <div className='card-container' id='three'>

      <LazyLoad className="cover-image">
      <div style={{ position: 'relative' }}>
          {/* <Mark /> */}
          <img src={imageProject} alt="Teslo Shop" />
        </div>
      </LazyLoad>
      
      <div className="card-information">
          <div className='title-project'>
            <h3>Teslo Shop</h3>
            <div></div>
          </div>

          <div className="technologies">
            
            <div className="tech">
              <SiNextdotjs />
              <span>NEXTJS</span>
            </div>

            <div className="tech">
              <SiTypescript />
              <span>TYPESCRIPT</span>
            </div>

            <div className="tech">
              <SiMaterialui />
              <span>MaterialUI</span>
            </div>
          </div>

          <p className='description'>
            Teslo Shop is a ecommerce with multiple functionalities that improve the user experience. Login, register, administration, payment, search engine, ...
          </p>

          <div className='buttons'>
              <a href='https://teslo-shop-ecommence.vercel.app/' target={"_blank"} rel='noreferrer'><button>
                <RiShareForwardFill />
                Live
              </button></a>

              <a href='https://github.com/cmglezpdev/Teslo-Shop' target={"_blank"} rel='noreferrer'><button>
                <AiFillGithub />
                Source
              </button></a>
          </div>

      </div>
    </div>
  )
}

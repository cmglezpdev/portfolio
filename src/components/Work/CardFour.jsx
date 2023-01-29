import LazyLoad from 'react-lazy-load';
import { AiFillGithub } from 'react-icons/ai';
import { SiNestjs, SiPostgresql } from 'react-icons/si'


import imageProject from '../../props/Projects/TesloShopImage.png'
import './cardProject.scss';

export const CardFour = () => {
  return (
    <div className='card-container' id='four'>
      <LazyLoad className='cover-image'>
        <div style={{ position: 'relative' }}>
          <img src={imageProject} alt="Teslo Shop API" />
        </div>
      </LazyLoad>
      
      <div className="card-information">
          <span className='status-project'>currenly working on</span>
          
          <div className='title-project'>
            <h3>TesloShop API</h3>
            <div></div>
          </div>

          <div className="technologies">
      
            <div className="tech">
              <SiNestjs />
              <span>Nest.js</span>
            </div>
          
            <div className="tech">
              <SiPostgresql />
              <span>Postgres</span>
            </div>

          </div>

          <p className='description'>
            Alternative RESTFul API of my Teslo Shop ecommerce. You can create products, edit them, consult them and a login system for users.
          </p>

          <div className='buttons'>
              {/* <a href='#' target={"_blank"} rel='noreferrer'><button>
                <RiShareForwardFill />
                Live
              </button></a> */}

              <a href='https://github.com/cmglezpdev/teslo-shop-nestjs' target={"_blank"} rel='noreferrer'><button>
                <AiFillGithub />
                Source
              </button></a>
          </div>

      </div>
    </div>
  )
}
